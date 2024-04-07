package com.vlados.webshop.userservice.util.jwt;

import com.vlados.webshop.userservice.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtGenerator {

    @Value("${security.jwt.secret:${security.jwt.default_secret}}")
    private String secret;

    public String generate(User user) {
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        Map<String, Object> map = new HashMap<>();
        map.put("alg", "HS256");
        map.put("typ", "JWT");

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());
        extraClaims.put("role", user.getRole());
        extraClaims.put("name", user.getName());

        return Jwts.builder()
                .setClaims(extraClaims)
                .setHeader(map)
                .setSubject(user.getEmail())
                .signWith(SignatureAlgorithm.HS256, signingKey)
                .compact();
    }
}