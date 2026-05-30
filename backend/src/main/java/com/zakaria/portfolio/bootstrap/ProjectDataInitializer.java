package com.zakaria.portfolio.bootstrap;

import com.zakaria.portfolio.domain.Project;
import com.zakaria.portfolio.repo.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectDataInitializer implements CommandLineRunner {

  private final ProjectRepository projectRepository;

  public ProjectDataInitializer(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  @Override
  public void run(String... args) {
    if (projectRepository.count() > 0) return;

    List<String> coreStack = List.of(
        "Jenkins",
        "Kubernetes",
        "Docker",
        "Prometheus",
        "Grafana",
        "Spring Boot",
        "Next.js"
    );

    String description = String.join("\n",
        "Conception et automatisation d’un pipeline CI/CD complet via un Jenkinsfile pour builder, tester et conteneuriser une application micro-services.",
        "Déploiement et gestion de l’infrastructure sur un cluster Kubernetes en utilisant des objets natifs (Deployments, Services, Ingress, PV/PVC).",
        "Mise en place de stratégies de mise à jour (Rolling Updates) et supervision des ressources avec Prometheus et Grafana."
    );

    Project flagship = new Project(
        "flagship",
        "Orchestration Kubernetes & Pipeline Jenkins CI/CD",
        description,
        coreStack,
        null,
        null
    );

    projectRepository.save(flagship);
  }
}

