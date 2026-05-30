package com.zakaria.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

  @Id
  private String id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false, columnDefinition = "text")
  private String description;

  @Column(nullable = false)
  private String coreStack; // comma-separated (simple seed-friendly model)

  @Column
  private String websiteUrl;

  @Column
  private String repoUrl;

  // JPA
  protected Project() {}

  public Project(
      String id,
      String title,
      String description,
      List<String> coreStack,
      String websiteUrl,
      String repoUrl
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.coreStack = String.join(",", coreStack);
    this.websiteUrl = websiteUrl;
    this.repoUrl = repoUrl;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public List<String> getCoreStackList() {
    return List.of(coreStack.split(","));
  }

  public String getWebsiteUrl() {
    return websiteUrl;
  }

  public String getRepoUrl() {
    return repoUrl;
  }
}

