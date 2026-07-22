package com.commercehub.backend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Standard paginated response.
 *
 * @param <T> Response payload type
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResponse<T> {

    /**
     * Request status.
     */
    @Builder.Default
    private boolean success = true;

    /**
     * Response message.
     */
    private String message;

    /**
     * Page content.
     */
    private List<T> content;

    /**
     * Current page number.
     */
    private int page;

    /**
     * Page size.
     */
    private int size;

    /**
     * Total number of elements.
     */
    private long totalElements;

    /**
     * Total number of pages.
     */
    private int totalPages;

    /**
     * Number of elements in current page.
     */
    private int numberOfElements;

    /**
     * Is first page?
     */
    private boolean first;

    /**
     * Is last page?
     */
    private boolean last;

    /**
     * Has next page?
     */
    private boolean hasNext;

    /**
     * Has previous page?
     */
    private boolean hasPrevious;

    /**
     * Response timestamp.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    /**
     * Factory method to convert Spring Page into PageResponse.
     */
    public static <T> PageResponse<T> of(Page<T> page, String message) {

        return PageResponse.<T>builder()
                .success(true)
                .message(message)
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .numberOfElements(page.getNumberOfElements())
                .first(page.isFirst())
                .last(page.isLast())
                .hasNext(page.hasNext())
                .hasPrevious(page.hasPrevious())
                .build();
    }

}