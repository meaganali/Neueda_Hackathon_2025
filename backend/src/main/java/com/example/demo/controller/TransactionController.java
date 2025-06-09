package com.example.demo.controller;

import com.example.demo.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

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

    @GetMapping(value = "")
    public ResponseEntity<Object> getAllTransactions() {
        String url = astraDbEndpoint + "/keyspaces/" + keyspace + "/transactions";
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Cassandra-Token", authToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, Object.class);
    }

    @PostMapping
    public ResponseEntity<Object> createTransaction(@RequestBody Transaction transaction) {
        String url = astraDbEndpoint + "/keyspaces/" + keyspace + "/transactions";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Cassandra-Token", authToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        com.example.demo.controller.HttpEntity<Void> request = new HttpEntity<>(transaction, headers);

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
