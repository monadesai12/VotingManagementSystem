package com.vms.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username")	})
public class User implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank(message="Fisrst Name cannot be left empty")
	@Pattern(regexp = "^[a-zA-Z ]+$", message="User name should only contain alphabets")
	private String firstName;
	
	@NotBlank(message="Last Name cannot be left empty")
	@Pattern(regexp = "^[a-zA-Z ]*$", message="User name should only contain alphabets")
	private String lastName;
	
	
	
	@Min(value = 0, message = "Age cannot be zero")
	@Max(value=120 , message ="Age cannot be such huge number")
	private int age;
	
	@NotBlank(message="Mobile Number is mandatory")
	@Pattern(regexp ="\\d{1,10}$", message="Mobile number is invalid")
	private String mobileNumber;
	
	@NotBlank(message="Gender is mandatory field")
	private String gender;
	
	@Column(unique=true)
	@NotBlank(message="Aadharcard Number is mandatory")
	@Pattern(regexp ="^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$",message="Aadhar card Number should be valid 12 digit Numer")
	private String adharCardNumber;
	
	private String address;
	
	@NotBlank(message="Pincode is mandatory")
	private String pincode;
	
	
	@Email(message="Email is not in valid format")
	@NotBlank(message="Email is a mandatory")
	private String email;
	
	@NotBlank(message="username is a mandatory")
	private String username;
	
	@NotBlank(message="password is a mandatory")
	private String password;
	
	@CreationTimestamp
	private LocalDateTime registerAt;
	
	private LocalDateTime userDeletedAt;
	private String deleteUserFlag = "N";

	private String role;
	
	  
    @JsonBackReference("candidate")
	@OneToMany(mappedBy = "user")
	private List<Candidate> candidate;
    
    @JsonBackReference("voter_logs")
	@OneToMany(mappedBy = "user")
	private List<VoterLogs> voterLogs;

    
	
	public User() {
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public String getAdharCardNumber() {
		return adharCardNumber;
	}

	public void setAdharCardNumber(String adharCardNumber) {
		this.adharCardNumber = adharCardNumber;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getRegisterAt() {
		return registerAt;
	}

	public void setRegisterAt(LocalDateTime registerAt) {
		this.registerAt = registerAt;
	}

	public LocalDateTime getUserDeletedAt() {
		return userDeletedAt;
	}

	public void setUserDeletedAt(LocalDateTime userDeletedAt) {
		this.userDeletedAt = userDeletedAt;
	}

	public String getDeleteUserFlag() {
		return deleteUserFlag;
	}

	public void setDeleteUserFlag(String deleteUserFlag) {
		this.deleteUserFlag = deleteUserFlag;
	}

	public User(
			@NotBlank(message = "name cannot be left empty") @Pattern(regexp = "^[a-zA-Z ]+$", message = "User name should only contain alphabets") String firstName,
			@NotBlank(message = "name cannot be left empty") @Pattern(regexp = "^[a-zA-Z ]*$", message = "User name should only contain alphabets") String lastName,
			@Min(value = 0, message = "Age cannot be zero") @Max(value = 120, message = "Age cannot be such huge number") int age,
			@Pattern(regexp = "\\d{1,10}$", message = "Mobile number is invalid") String mobileNumber, String gender,
			@Pattern(regexp = "^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$", message = "Aadhar card Number should be valid 12 digit Numer") String adharCardNumber,
			String address,
			String pincode,
			@Email(message = "Email is not in valid format") String email, String username, String password,
			LocalDateTime registerAt, LocalDateTime userDeletedAt, String deleteUserFlag, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.mobileNumber = mobileNumber;
		this.gender = gender;
		this.adharCardNumber = adharCardNumber;
		this.address = address;
		this.pincode = pincode;
		this.email = email;
		this.username = username;
		this.password = password;
		this.registerAt = registerAt;
		this.userDeletedAt = userDeletedAt;
		this.deleteUserFlag = deleteUserFlag;
		this.role = role;
		
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", age=" + age
				+ ", mobileNumber=" + mobileNumber + ", gender=" + gender + ", adharCardNumber=" + adharCardNumber
				+ ", address=" + address + ", pincode=" + pincode + ", email=" + email + ", username=" + username
				+ ", password=" + password + ", registerAt=" + registerAt + ", userDeletedAt=" + userDeletedAt
				+ ", deleteUserFlag=" + deleteUserFlag + ", role=" + role + ", candidate=" + candidate + ", voterLogs="
				+ voterLogs + "]";
	}
	
	
	
	
	
}