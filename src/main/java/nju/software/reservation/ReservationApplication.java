package nju.software.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.boot.builder.SpringApplicationBuilder;

@Configuration
@SpringBootApplication
public class ReservationApplication extends SpringBootServletInitializer{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ReservationApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(ReservationApplication.class, args);
	}

//	@Override
//	public void addInterceptors(InterceptorRegistry registry){
//		registry.addInterceptor(new HandlerInterceptor() {
//			@Override
//			public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
////				log.debug("get request!");
//				return true;
//			}
//		})
//				.addPathPatterns("/**")
//				.excludePathPatterns("/**")
//				.excludePathPatterns("/static/**")
//				.excludePathPatterns("/static/css/**")
//				.excludePathPatterns("/static/fonts/**")
//				.excludePathPatterns("/static/js/**")
//				.excludePathPatterns("/static/templates/**");
//	}
//
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry){
//		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
//	}
}
