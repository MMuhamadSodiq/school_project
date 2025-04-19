package org.example.backend.Repo;

import org.example.backend.Entity.Role;
import org.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface UsersRepo extends JpaRepository<User, UUID> {
    User findByUsername(String username);
}
