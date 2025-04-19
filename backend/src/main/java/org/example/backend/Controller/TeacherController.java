package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Entity.Teacher;
import org.example.backend.Payload.TeacherDTO;
import org.example.backend.Repo.TeacherRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherRepo teacherRepo;
    @PostMapping("/api/teacher")
    public ResponseEntity<?> create(@RequestBody TeacherDTO dto){
        Teacher saved = teacherRepo.save(new Teacher(
                null,
                dto.getFirstname(),
                dto.getLastname()
        ));
        return new ResponseEntity<>(saved,HttpStatus.OK);
    }
    @PostMapping("/api/teacher/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody TeacherDTO dto){
        Optional<Teacher> byId = teacherRepo.findById(id);
        if(byId.isPresent()){
            Teacher saved = teacherRepo.save(new Teacher(
                    byId.get().getId(),
                    dto.getFirstname(),
                    dto.getLastname()
            ));
            return new ResponseEntity<>(saved,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/api/teachers")
    public ResponseEntity<?> getAll(){
        List<Teacher> teachers = teacherRepo.findAll();
        return new ResponseEntity<>(teachers,HttpStatus.OK);
    }
    @DeleteMapping("/api/teacher/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        Optional<Teacher> byId = teacherRepo.findById(id);
        if(byId.isPresent()){
            teacherRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
