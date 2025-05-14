// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const productNavigation = document.querySelector('.product-navigation');

// Configuration
const config = {
  productCategories: {
    'DAILY SKIN CARE (FOR ALL SKIN TYPE)': 'CHĂM SÓC DA HÀNG NGÀY (CHO MỌI LOẠI DA)',
    'BALANCE SKIN CARE SET (FOR ACNE SKIN)': 'BỘ CHĂM SÓC DA CÂN BẰNG (CHO DA MỤN)',
    'AFTER CARE': 'CHĂM SÓC SAU ĐIỀU TRỊ',
    'SUNCARE': 'CHỐNG NẮNG'
  },
  products: {
    'GTM MILK CLEANSING': {
      desc: 'Sữa rửa mặt dạng sữa nhẹ nhàng làm sạch lớp trang điểm và bụi bẩn, không gây khô da sau khi rửa mặt.',
      specs: '500ml'
    },
    'GTM ROSE HERB TONER': {
      desc: 'Nước hoa hồng chứa chiết xuất hoa hồng Centifolia giúp tạo màng bảo vệ độ ẩm và điều chỉnh kết cấu da.',
      specs: '500ml'
    }
  }
};

// Utility Functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Scroll Handling
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Mobile Menu Toggle
const toggleMobileMenu = () => {
  navLinks.classList.toggle('active');
};

// Product Navigation
const handleProductNavigation = () => {
  const links = productNavigation.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
      // Scroll to section
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

// Lazy Loading Images
const lazyLoadImages = () => {
  const images = document.querySelectorAll('[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Animation on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  elements.forEach(element => observer.observe(element));
};

// Price Formatting
const formatPrice = (price, currency = '₩') => {
  return `${currency}${price.toLocaleString()}`;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  document.title = "CMED - Chuyên gia OEM/ODM/OBM trong lĩnh vực làm đẹp";
  
  // Initialize event listeners
  window.addEventListener('scroll', debounce(handleScroll, 10));
  document.querySelector('.mobile-menu-toggle')?.addEventListener('click', toggleMobileMenu);
  
  // Initialize features
  handleProductNavigation();
  lazyLoadImages();
  animateOnScroll();
  
  // Add fade-in animation to sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
  });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPrice,
    config
  };
} 
