package com.example.demo.controller;

import com.example.demo.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.HttpEntity;



@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Value("${astra.db.rest.endpoint}")
    private String astraDbEndpoint;

    @Value("${astra.db.rest.keyspace}")
    private String keyspace;

    @Value("${astra.db.rest.token}")
    private String authToken;

    @Autowired
    private RestTemplate restTemplate;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllTransactions() {
        String url = astraDbEndpoint + "/keyspaces/" + keyspace + "/transactions";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Cassandra-Token", authToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, Object.class);
    }

    @PostMapping
    public ResponseEntity<Object> createTransaction(@RequestBody Transaction transaction) {
        String url = astraDbEndpoint + "/keyspaces/" + keyspace + "/transactions";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Cassandra-Token", authToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Transaction> request = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.POST, request, Object.class);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTransactionById(@PathVariable String id) {
        String url = astraDbEndpoint + "/keyspaces/" + keyspace + "/transactions/" + id;
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Cassandra-Token", authToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, Object.class);
    }
}
