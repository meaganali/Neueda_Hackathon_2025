package com.example.demo.entity;

public class Transaction {
    // Define fields according to your requirements
    private String id;
    private double amount;
    private String description;

    // Constructors
    public Transaction() {}

    public Transaction(String id, double amount, String description) {
        this.id = id;
        this.amount = amount;
        this.description = description;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
