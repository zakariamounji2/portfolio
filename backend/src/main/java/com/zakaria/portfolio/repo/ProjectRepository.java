package com.zakaria.portfolio.repo;

import com.zakaria.portfolio.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, String> {
}

