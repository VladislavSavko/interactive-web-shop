package com.vlados.webshop.userservice.repos;

import com.vlados.webshop.userservice.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUserId(final long userId);
}
