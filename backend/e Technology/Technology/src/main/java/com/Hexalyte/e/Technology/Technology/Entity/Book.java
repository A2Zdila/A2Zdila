package com.Hexalyte.e.Technology.Technology.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Book {
    //create book table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    //create book @ category one to many column
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    //book and user
    @ManyToMany(mappedBy = "books")
    private Set<User> users = new HashSet<>();

    //getter setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Collection<Object> getCategories() {
        return null;
    }
}
