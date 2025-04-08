package com.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchConverter;
import org.springframework.data.elasticsearch.core.convert.MappingElasticsearchConverter;
import org.springframework.data.elasticsearch.core.mapping.SimpleElasticsearchMappingContext;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import com.ecommerce.repository.ProductElasticsearchRepository;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;

@Configuration
@EnableElasticsearchRepositories(
    basePackages = "com.ecommerce.repository",
    includeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE, 
        classes = ProductElasticsearchRepository.class
    )
)

public class ElasticsearchConfig extends ElasticsearchConfiguration {

    @Value("${elasticsearch.host:localhost}")
    private String host;

    @Value("${elasticsearch.port:9200}")
    private int port;

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo(host + ":" + port)
                .withConnectTimeout(5000)
                .withSocketTimeout(3000)
                .build();
    }

    @Bean
    public RestClient restClient() {
        return RestClient.builder(new HttpHost(host, port))
                .build();
    }

    @Bean
    public JacksonJsonpMapper jacksonJsonpMapper() {
        return new JacksonJsonpMapper();
    }

    @Bean
    public ElasticsearchOperations elasticsearchOperations() {
        return new ElasticsearchTemplate(
            elasticsearchClient(
                elasticsearchTransport(
                    restClient(),
                    jacksonJsonpMapper()
                )
            ),
            elasticsearchConverter()
        );
    }

    @Bean
    public ElasticsearchConverter elasticsearchConverter() {
        return new MappingElasticsearchConverter(elasticsearchMappingContext());
    }

    @Bean
    public SimpleElasticsearchMappingContext elasticsearchMappingContext() {
        return new SimpleElasticsearchMappingContext();
    }
}