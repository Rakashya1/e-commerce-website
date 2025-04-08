package com.ecommerce.data;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductElasticsearchRepository;
import com.ecommerce.repository.ProductMongoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    @Profile("dev")
    public CommandLineRunner initData(ProductMongoRepository mongoRepository, 
                                    ProductElasticsearchRepository elasticsearchRepository) {
        return args -> {
            // Initialize your sample data here
        };
    }
}