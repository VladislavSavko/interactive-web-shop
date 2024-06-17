package com.vlados.webshop.gatewayservice.config;

import com.vlados.webshop.gatewayservice.jwt.JwtAuthenticationManager;
import com.vlados.webshop.gatewayservice.jwt.repos.JwtSecurityContextRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableWebFluxSecurity
public class SecurityConfig {
    private final JwtAuthenticationManager authenticationManager;
    private final JwtSecurityContextRepository contextRepository;

    @Bean
    CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        corsConfig.setAllowedOrigins(List.of("*"));
        corsConfig.setAllowedMethods(List.of("*"));
        corsConfig.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity httpSecurity) {
        return httpSecurity
                .authorizeExchange(
                        authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                                .pathMatchers(HttpMethod.GET, "/api/v1/users/{id}/data")
                                .hasAnyAuthority("CLIENT", "ADMIN")
                                .pathMatchers(HttpMethod.GET, "/api/v1/users/**")
                                .hasAuthority("ADMIN")
                                .pathMatchers(HttpMethod.GET, "/api/v1/shop/items/forFr", "/api/v1/shop/items/search/**")
                                .hasAnyAuthority("CLIENT", "ADMIN")
                                .pathMatchers(HttpMethod.GET, "/api/v1/shop/items", "/api/v1/shop/items/{id}")
                                .permitAll()
                                .pathMatchers(HttpMethod.POST, "/api/v1/users/**")
                                .permitAll()
                                .pathMatchers(HttpMethod.POST, "/api/v1/shop/cart/{id}", "/api/v1/shop/orders/{id}")
                                .hasAnyAuthority("CLIENT", "ADMIN")
                                .pathMatchers(HttpMethod.POST, "/api/v1/shop/items", "/api/v1/shop/categories", "/api/v1/shop/images")
                                .hasAuthority("ADMIN")
                                .pathMatchers(HttpMethod.DELETE, "/api/v1/users/**", "api/v1/shop/cart/**", "api/v1/shop/orders/**")
                                .hasAnyAuthority("CLIENT", "ADMIN")
                                .pathMatchers(HttpMethod.DELETE, "/api/v1/shop/items/{id}", "/api/v1/shop/items/images/**", "api/v1/shop/categories/**")
                                .hasAuthority("ADMIN")
                                .pathMatchers(HttpMethod.PUT, "/api/v1/users/**")
                                .hasAuthority("CLIENT")
                                .pathMatchers(HttpMethod.PUT, "/api/v1/shop/**")
                                .hasAuthority("ADMIN")
                                .anyExchange()
                                .authenticated()
                )
                .csrf(ServerHttpSecurity.CsrfSpec::disable)//TODO: enable csrf??
                .cors(corsSpec -> corsSpec.configurationSource(corsConfiguration()))
                .authenticationManager(authenticationManager)
                .securityContextRepository(contextRepository)
                .build();
    }
}
