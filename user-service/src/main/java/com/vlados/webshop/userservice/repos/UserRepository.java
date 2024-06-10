package com.vlados.webshop.userservice.repos;

import com.vlados.webshop.userservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(final String email);

    @Query("SELECT u.email FROM _users u WHERE u.id=:id")
    Optional<String> findEmailById(@Param("id") long id);

    @Query("SELECT u.name, u.email FROM _users u WHERE u.id=:id")
    Optional<List<Object>> findNameAndEmailById(@Param("id") long id);

    List<User> findByEmailContainingIgnoreCase(final String email);

    List<User> findByNameContainingIgnoreCase(final String name);

    void deleteByEmail(final String email);

    boolean existsByEmail(final String email);
}
