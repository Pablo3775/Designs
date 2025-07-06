// Products data - Agora com 9 designs
const products = [
  {
    id: 1,
    name: "Neon Cyber Logo",
    price: 89.99,
    category: "Logo Design",
    rating: 4.9,
    description: "Design futurístico com efeitos neon",
    icon: "fas fa-bolt",
  },
  {
    id: 2,
    name: "Minimal Brand Kit",
    price: 149.99,
    category: "Branding",
    rating: 4.8,
    description: "Kit completo de identidade visual minimalista",
    icon: "fas fa-cube",
  },
  {
    id: 3,
    name: "Abstract Art Pack",
    price: 69.99,
    category: "Illustrations",
    rating: 4.7,
    description: "Coleção de artes abstratas modernas",
    icon: "fas fa-paint-brush",
  },
  {
    id: 4,
    name: "UI/UX Template",
    price: 199.99,
    category: "Web Design",
    rating: 5.0,
    description: "Template completo para aplicações modernas",
    icon: "fas fa-desktop",
  },
  {
    id: 5,
    name: "Social Media Pack",
    price: 79.99,
    category: "Social Media",
    rating: 4.6,
    description: "Templates para redes sociais profissionais",
    icon: "fas fa-share-alt",
  },
  {
    id: 6,
    name: "Corporate Identity",
    price: 299.99,
    category: "Branding",
    rating: 4.9,
    description: "Identidade visual corporativa completa",
    icon: "fas fa-building",
  },
  {
    id: 7,
    name: "E-commerce Design",
    price: 249.99,
    category: "Web Design",
    rating: 4.8,
    description: "Design completo para loja virtual",
    icon: "fas fa-shopping-bag",
  },
  {
    id: 8,
    name: "Motion Graphics",
    price: 189.99,
    category: "Animation",
    rating: 4.7,
    description: "Animações e motion graphics profissionais",
    icon: "fas fa-play-circle",
  },
  {
    id: 9,
    name: "Print Design Kit",
    price: 129.99,
    category: "Print Design",
    rating: 4.5,
    description: "Designs para materiais impressos",
    icon: "fas fa-print",
  },
]

// Cart state
let cart = []
let isCartOpen = false

// DOM elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const productsGrid = document.getElementById("productsGrid")
const cartSidebar = document.getElementById("cartSidebar")
const cartContent = document.getElementById("cartContent")
const cartBadge = document.getElementById("cartBadge")
const cartFooter = document.getElementById("cartFooter")
const emptyCart = document.getElementById("emptyCart")
const totalPrice = document.getElementById("totalPrice")
const overlay = document.getElementById("overlay")
const customForm = document.getElementById("customForm")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
  updateCartUI()
  initNavbar()
  initCustomForm()
})

// Navbar functionality
function initNavbar() {
  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active nav link based on scroll position
    updateActiveNavLink()
  })

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Nav links smooth scroll
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = ["home", "products", "about", "custom"]
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const sectionTop = section.offsetTop - 100
      const sectionBottom = sectionTop + section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = sectionId
      }
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Custom form functionality
function initCustomForm() {
  customForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(customForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const description = formData.get("description")

    // Create WhatsApp message
    const message = `Olá! Gostaria de solicitar um design personalizado:

*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone}

*Descrição do projeto:*
${description}

Aguardo retorno!`

    // WhatsApp URL (substitua pelo seu número)
    const whatsappNumber = "5516996361601" // Seu número: +55 (16) 99636-1601
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form
    customForm.reset()

    // Show success message
    showSuccessMessage()
  })
}

// Show success message
function showSuccessMessage() {
  const submitBtn = document.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!'
  submitBtn.style.background = "linear-gradient(45deg, #10b981, #34d399)"

  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.style.background = "linear-gradient(45deg, #34d399, #60a5fa)"
  }, 3000)
}

// Render products
function renderProducts() {
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <i class="${product.icon}"></i>
                <div class="product-category">${product.category}</div>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h4 class="product-name">${product.name}</h4>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  updateCartUI()
  showAddedToCartAnimation()
}

// Remove from cart
function removeFromCart(productId) {
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1
  } else {
    cart = cart.filter((item) => item.id !== productId)
  }

  updateCartUI()
}

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Update badge
  cartBadge.textContent = totalItems
  cartBadge.style.display = totalItems > 0 ? "flex" : "none"

  // Update total price
  totalPrice.textContent = `R$ ${total.toFixed(2)}`

  // Show/hide cart sections
  if (cart.length === 0) {
    emptyCart.style.display = "block"
    cartFooter.style.display = "none"
    cartContent.innerHTML =
      '<div class="empty-cart" id="emptyCart"><i class="fas fa-shopping-cart"></i><p>Seu carrinho está vazio</p></div>'
  } else {
    emptyCart.style.display = "none"
    cartFooter.style.display = "block"
    renderCartItems()

    // Update checkout button to redirect to WhatsApp
    const checkoutBtn = document.querySelector(".checkout-btn")
    if (checkoutBtn) {
      checkoutBtn.onclick = () => redirectToWhatsApp(total)
    }
  }
}

// Redirect to WhatsApp with cart info
function redirectToWhatsApp(total) {
  const cartItems = cart
    .map((item) => `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`)
    .join("\n")

  const message = `Olá! Gostaria de finalizar minha compra:

*Itens do carrinho:*
${cartItems}

*Total: R$ ${total.toFixed(2)}*

Como posso proceder com o pagamento?`

  // WhatsApp URL (substitua pelo seu número)
  const whatsappNumber = "5516996361601" // Seu número: +55 (16) 99636-1601
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  // Open WhatsApp
  window.open(whatsappUrl, "_blank")
}

// Render cart items
function renderCartItems() {
  cartContent.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-header">
                <div class="cart-item-image">
                    <i class="${item.icon}"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <span class="item-total">R$ ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `,
    )
    .join("")
}

// Toggle cart
function toggleCart() {
  isCartOpen = !isCartOpen

  if (isCartOpen) {
    cartSidebar.classList.add("open")
    overlay.classList.add("active")
    document.body.style.overflow = "hidden"
  } else {
    cartSidebar.classList.remove("open")
    overlay.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Show added to cart animation
function showAddedToCartAnimation() {
  const cartBtn = document.querySelector(".cart-btn")
  cartBtn.style.transform = "scale(1.1)"
  cartBtn.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.6)"

  setTimeout(() => {
    cartBtn.style.transform = "scale(1)"
    cartBtn.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.3)"
  }, 200)
}

// Smooth scroll for hero button
document.querySelector(".hero-btn").addEventListener("click", () => {
  document.querySelector(".products").scrollIntoView({
    behavior: "smooth",
  })
})

// Close cart with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isCartOpen) {
    toggleCart()
  }
})

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
  const elements = document.querySelectorAll(".floating-element")
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  elements.forEach((element, index) => {
    const speed = (index + 1) * 0.5
    const xOffset = (x - 0.5) * speed * 20
    const yOffset = (y - 0.5) * speed * 20

    element.style.transform = `translate(${xOffset}px, ${yOffset}px)`
  })
})
