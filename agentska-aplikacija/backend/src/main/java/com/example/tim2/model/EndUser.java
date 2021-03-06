package com.example.tim2.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.owasp.encoder.Encode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class EndUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "surname", nullable = true)
    private String surname;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "activated", nullable = true)
    private boolean activated;

    @Column(name = "firstLogin", nullable = true)
    private boolean firstLogin;

    @Column(name = "canReserve", nullable = true)
    private boolean canReserve;

    @Column(name = "canComment", nullable = true)
    private boolean canComment;

    @Column(name = "numberRefusedComments", nullable = true)
    private int numberRefusedComments;

    @Column(name = "numberCanceledRequest", nullable = true)
    private int numberCanceledRequest;

    @JsonManagedReference(value = "enduser_movement")
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private User user;

    @JsonManagedReference(value = "endusermes_mov")
    @OneToMany(mappedBy = "endUser", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<Message>();

    public EndUser() {
    }

    public EndUser(String name, String surname, String address, String city, boolean a, boolean b, int c, int d) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        canComment = a;
        canReserve = b;
        numberRefusedComments = c;
        numberCanceledRequest = d;
    }

    public EndUser(String name, String surname, String address, String city) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
    }

    public EndUser(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EndUser escapeParameters(EndUser u) {
        u.setCity(Encode.forHtml( u.getCity() ));
        u.setAddress(Encode.forHtml( u.getAddress()));
        u.setName(Encode.forHtml(  u.getName() ));
        u.setSurname(Encode.forHtml( u.getSurname() ));
        String numberCanceled = Encode.forHtml( Integer.toString(u.getNumberCanceledRequest()));
        u.setNumberCanceledRequest(Integer.parseInt(numberCanceled));
        String numberRefused = Encode.forHtml( Integer.toString(u.getNumberRefusedComments()));
        u.setNumberRefusedComments(Integer.parseInt(numberRefused));
        return u;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public boolean isCanReserve() {
        return canReserve;
    }

    public void setCanReserve(boolean canReserve) {
        this.canReserve = canReserve;
    }

    public boolean isCanComment() {
        return canComment;
    }

    public void setCanComment(boolean canComment) {
        this.canComment = canComment;
    }

    public int getNumberRefusedComments() {
        return numberRefusedComments;
    }

    public void setNumberRefusedComments(int numberRefusedComments) {
        this.numberRefusedComments = numberRefusedComments;
    }

    public int getNumberCanceledRequest() {
        return numberCanceledRequest;
    }

    public void setNumberCanceledRequest(int numberCanceledRequest) {
        this.numberCanceledRequest = numberCanceledRequest;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }


}
