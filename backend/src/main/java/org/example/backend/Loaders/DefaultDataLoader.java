package org.example.backend.Loaders;

import lombok.RequiredArgsConstructor;
import org.example.backend.Entity.Role;
import org.example.backend.Entity.User;
import org.example.backend.Repo.RoleRepo;
import org.example.backend.Repo.UsersRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultDataLoader implements CommandLineRunner {
    private final RoleRepo roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsersRepo usersRepository;

    @Override
    public void run(String... args) {
        if(roleRepository.findAll().isEmpty() && usersRepository.findAll().isEmpty()) {
            Role role = new Role();
            role.setRoleName("ROLE_DIRECTOR");
            Role role3 = new Role();
            role3.setRoleName("ROLE_DEVELOPER");
            roleRepository.saveAll(List.of(role, role3));
            User developer = new User(
                    null,
                    "mmsodiq",
                    passwordEncoder.encode("pen###ter@"),
                    List.of(role3)
            );
            User director = new User(
              null,
              "director",
              passwordEncoder.encode("root123"),
              List.of(role)
            );
            usersRepository.saveAll(List.of(developer, director));
        }
    }

}