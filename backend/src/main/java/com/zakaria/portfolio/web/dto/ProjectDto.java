package com.zakaria.portfolio.web.dto;

import java.util.List;

public class ProjectDto {

  private String id;
  private String title;
  private String description;
  private List<String> coreStack;
  private String websiteUrl;
  private String repoUrl;

  public ProjectDto() {}

  public ProjectDto(
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
    this.coreStack = coreStack;
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

  public List<String> getCoreStack() {
    return coreStack;
  }

  public String getWebsiteUrl() {
    return websiteUrl;
  }

  public String getRepoUrl() {
    return repoUrl;
  }
}

