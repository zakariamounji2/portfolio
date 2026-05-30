package com.zakaria.portfolio.web;

import com.zakaria.portfolio.domain.Project;
import com.zakaria.portfolio.repo.ProjectRepository;
import com.zakaria.portfolio.web.dto.ProjectDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {

  private final ProjectRepository projectRepository;

  public PortfolioController(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  @GetMapping("/projects")
  public List<ProjectDto> getProjects() {
    return projectRepository.findAll().stream().map(this::toDto).toList();
  }

  private ProjectDto toDto(Project p) {
    return new ProjectDto(
        p.getId(),
        p.getTitle(),
        p.getDescription(),
        p.getCoreStackList(),
        p.getWebsiteUrl(),
        p.getRepoUrl()
    );
  }
}

