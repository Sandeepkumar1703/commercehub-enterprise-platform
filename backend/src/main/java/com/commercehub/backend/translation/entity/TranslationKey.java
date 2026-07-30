package com.commercehub.backend.translation.entity;

import com.commercehub.backend.common.entity.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a translatable key used throughout the application.
 *
 * Example:
 * product.add_to_cart
 * checkout.place_order
 * auth.login
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "translation_keys",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_translation_key_name",
                        columnNames = "key_name"
                )
        }
)
public class TranslationKey extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Unique translation key.
     */
    @Column(name = "key_name", nullable = false, length = 255)
    private String keyName;

    /**
     * Optional description for developers.
     */
    @Column(length = 500)
    private String description;

    /**
     * All translations for this key.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "translationKey",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<TranslationValue> translations = new ArrayList<>();
}