use salvo::oapi::{Contact, Info};

// Configure OpenAPI documentation
pub fn get_api_info() -> Info {
    Info::new("Falah API 🎯💯🔑", "1.0.0")
        .terms_of_service("https://petapi.com/terms/")
        .description(r#"> 🚀 **Why Rust?**
            A high-performance Rust server powered by the Salvo framework, offering RESTful endpoints for secure and scalable client-server communication.
            "#)
        .contact(Contact::new()
            .name("Admin Admin")
            .email("admin@petapi.com")
        )
}