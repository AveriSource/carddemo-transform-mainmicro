package com.mycompany.maingtpkg.config.apidocs;

import static com.mycompany.maingtpkg.config.apidocs.GatewaySwaggerResourcesProvider.swaggerResource;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.net.URI;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;
import reactor.core.publisher.Flux;
import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;

@ExtendWith(SpringExtension.class)
class GatewaySwaggerResourcesProviderTest {

    @InjectMocks
    GatewaySwaggerResourcesProvider gatewaySwaggerResourcesProvider;

    @Mock
    RouteLocator routeLocator;

    @Mock
    SwaggerResourcesProvider swaggerResourcesProvider;

    @Test
    void shouldGet() {
        // Given
        ReflectionTestUtils.setField(gatewaySwaggerResourcesProvider, "gatewayName", "burger");
        when(swaggerResourcesProvider.get())
            .thenReturn(
                List.of(
                    swaggerResource("default", "/v3/api-docs"),
                    swaggerResource("default", "/v3/api-docs?group=management"),
                    swaggerResource("default", "/v3/api-docs?group=openapi")
                )
            );
        when(routeLocator.getRoutes())
            .thenReturn(
                Flux.just(
                    Route
                        .async()
                        .id("ReactiveCompositeDiscoveryClient_BURGER")
                        .uri(URI.create("lb://BURGER"))
                        .predicate(exchange -> true)
                        .build(),
                    Route
                        .async()
                        .id("ReactiveCompositeDiscoveryClient_BEER")
                        .uri(URI.create("lb://BEER"))
                        .predicate(exchange -> true)
                        .build()
                )
            );

        // When
        List<SwaggerResource> result = gatewaySwaggerResourcesProvider.get();

        // Then
        assertThat(result).isNotEmpty();
        assertThat(result.size()).isEqualTo(3);

        assertThat(result.get(0).getName()).isEqualTo("burger (default)");
        assertThat(result.get(0).getUrl()).isEqualTo("/v3/api-docs");

        assertThat(result.get(1).getName()).isEqualTo("burger (management)");
        assertThat(result.get(1).getUrl()).isEqualTo("/v3/api-docs?group=management");

        assertThat(result.get(2).getName()).isEqualTo("beer");
        assertThat(result.get(2).getUrl()).isEqualTo("/services/beer/v3/api-docs");
    }
}
