package com.example.tim2.repository;

import com.example.tim2.model.Entrepreneur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepreneurRepository extends JpaRepository<Entrepreneur, Long> {

    Entrepreneur findOneByBin(String bin);
}
