package com.backend.luaspets.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    @Modifying()
    @Query("update User u set u.fullName=:fullName, u.dni=:dni, u.address=:address, u.phoneNumber=:phoneNumber, u.role=:role where u.id=:id")
    void updateUser(
            @Param(value = "id") Integer id,
            @Param(value = "fullName") String fullName,
            @Param(value = "dni") String dni,
            @Param(value = "address") String address,
            @Param(value = "phoneNumber") String phoneNumber,
            @Param(value = "role") Role role);
}
