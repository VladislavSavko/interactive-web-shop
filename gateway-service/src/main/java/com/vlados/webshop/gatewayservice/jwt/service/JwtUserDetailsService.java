package com.vlados.webshop.gatewayservice.jwt.service;

import com.netflix.discovery.EurekaClient;
import com.vlados.webshop.gatewayservice.dto.UserAuthDto;
import com.vlados.webshop.gatewayservice.dto.exception.ExceptionResponse;
import com.vlados.webshop.gatewayservice.exception.ClientJwtServiceException;
import com.vlados.webshop.gatewayservice.jwt.JwtUser;
import com.vlados.webshop.gatewayservice.util.ResourceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.support.ServiceUnavailableException;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Primary
@RequiredArgsConstructor
public class JwtUserDetailsService implements ReactiveUserDetailsService {
    private final EurekaClient eurekaClient;
    private final WebClient webClient;

    @Value("${security.authentication.url}")
    private String AUTH_URL;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        String uri = String.format("%s%s/%s", getUsersUrlFromEureka(), AUTH_URL, username);
        return webClient.get().uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, this::handleClientError)
                .onStatus(HttpStatusCode::is5xxServerError,
                        error -> Mono.error(new ServiceUnavailableException(
                                ResourceUtil.getMessage("eureka.service.unavailable"))
                        )
                )
                .bodyToMono(UserAuthDto.class)
                .flatMap(user -> Mono.just(
                                JwtUser.builder()
                                        .role(user.getRole().toString())
                                        .username(user.getEmail())
                                        .build()
                        )
                );
    }

    private Mono<? extends Throwable> handleClientError(ClientResponse response) {
        if (response.statusCode() == HttpStatus.NOT_FOUND) {
            return Mono.error(new ClientJwtServiceException(ResourceUtil.getMessage("client.jwtservice.not_found")));
        } else {
            return Mono.error(new ClientJwtServiceException(ResourceUtil.getMessage("client.jwtservice.bad_request")));
        }
    }

    private String getUsersUrlFromEureka() {
        try {
            return eurekaClient
                    .getNextServerFromEureka("user-service", false)
                    .getHomePageUrl();
        } catch (RuntimeException e) {
            throw new RuntimeException(ResourceUtil.getMessage("eureka.service.unavailable"));
        }
    }

    @ExceptionHandler(ClientJwtServiceException.class)
    public ResponseEntity<ExceptionResponse> serviceClientExceptionHandler(ClientJwtServiceException e) {
        return new ResponseEntity<>(buildExceptionResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    private ExceptionResponse buildExceptionResponse(String message) {
        return new ExceptionResponse(message);
    }
}
