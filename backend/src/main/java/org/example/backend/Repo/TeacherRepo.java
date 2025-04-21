package org.example.backend.Repo;

import org.example.backend.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, UUID> {
    List<Teacher> findAllByOrderByCreatedDateAscFirstNameAscLastNameAsc();
}
