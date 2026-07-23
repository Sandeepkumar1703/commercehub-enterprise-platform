package com.commercehub.backend.auth.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


import lombok.Data;



@Data
public class ChangePasswordRequest {


    /**
     * Existing password
     */
    @NotBlank(message = "Current password is required")
    private String currentPassword;




    /**
     * New password
     */
    @NotBlank(message = "New password is required")
    @Size(
            min = 8,
            message = "Password must contain minimum 8 characters"
    )
    private String newPassword;





    /**
     * Confirmation of new password
     */
    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

}