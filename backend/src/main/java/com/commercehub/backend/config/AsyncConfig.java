package com.commercehub.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskDecorator;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.Map;
import java.util.concurrent.Executor;

@Slf4j
@Configuration
@EnableAsync
public class AsyncConfig {

    /**
     * Primary executor used by @Async methods.
     */
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(100);

        executor.setThreadNamePrefix("commercehub-async-");

        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(30);

        executor.setTaskDecorator(new LoggingTaskDecorator());

        executor.initialize();

        log.info("Async Task Executor initialized successfully.");

        return executor;
    }

    /**
     * Copies logging context (MDC) to async threads.
     */
    private static class LoggingTaskDecorator implements TaskDecorator {

        @Override
        public Runnable decorate(Runnable runnable) {

            Map<String, String> contextMap =
                    org.slf4j.MDC.getCopyOfContextMap();

            return () -> {

                try {

                    if (contextMap != null) {
                        org.slf4j.MDC.setContextMap(contextMap);
                    }

                    runnable.run();

                } finally {

                    org.slf4j.MDC.clear();

                }
            };
        }
    }
}