package com.vlados.webshop.gatewayservice.jwt;

import com.vlados.webshop.gatewayservice.jwt.util.JwtParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {
    private final JwtParser jwtParser;
    private final ReactiveUserDetailsService userDetailsService;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        String token = (String) authentication.getCredentials();
        log.info("Got token from user: {}", token);

        if (jwtParser.validate(token)) {
            String email = jwtParser.extractEmail(token);
            log.info("Email extracted from token: {}", email);
            return userDetailsService.findByUsername(email)
                    .flatMap(userDetails -> {
                        var auth = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        return Mono.just(auth);
                    });
        } else {
            return Mono.empty();
        }
    }
}
