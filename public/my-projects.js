(function () {
  // ---------------------------------------------------------------------
  // Add new projects here. Each one just needs: id, title, description,
  // an optional "tech" list, an optional "links" list ({label, url}), and
  // either "video" (a looping muted background clip, with an optional
  // "poster" still), "image" (a real screenshot path), or "gradient" (a CSS
  // background, used as a placeholder until real media is added). An
  // optional "logo" (a small icon path) is shown as a badge over the media.
  // "affiliation" is an optional institution line shown under the modal
  // title, "role" is an optional line describing your part in the work, and
  // "category" ("isr" or "personal") drives the All / ISR-Coimbra / Home
  // Project filter above the grid.
  // The grid and the popup are both built from this array automatically.
  // ---------------------------------------------------------------------
  var PROJECTS = [
    {
      id: 'codeface',
      title: 'CodeFace',
      category: 'isr',
      shortDescription: 'Deep-learning steganography that verifies ID photo integrity.',
      affiliation: 'Institute of Systems and Robotics · University of Coimbra',
      description: 'A deep-learning steganography method developed at the Institute of Systems and Robotics (ISR-UC), in partnership with Imprensa Nacional Casa da Moeda (INCM), that embeds an imperceptible secret message into a facial portrait and recovers it from a physically printed copy of an ID or travel document. CodeFace lets inspection authorities verify photo integrity on the spot with a smartphone camera, with or without internet access — without changing the portrait\'s visible appearance. Protected by two patent filings and published in IEEE Access.',
      role: 'Researcher and developer of the CodeFace deep learning model — from initial design and prototyping through training and testing.',
      tech: ['Deep Learning', 'Steganography', 'Computer Vision', 'Face Recognition', 'TensorFlow Lite'],
      links: [
        { label: 'Project Page (ISR-UC)', url: 'https://isr.uc.pt/projects/codeface-2?page=1' },
        { label: 'Results & Paper', url: 'https://farhadsh1992.github.io/CodeFace2/' }
      ],
      image: 'assets/images/projects/codeface/diagram.jpg',
      logo: 'assets/images/projects/codeface/logo.png'
    },
    {
      id: 'truim',
      title: 'TruIM',
      category: 'isr',
      shortDescription: 'Authenticating objects in certified images via steganography.',
      affiliation: 'Institute of Systems and Robotics · University of Coimbra',
      description: 'TruIM (Trust Image Understanding) develops technology to authenticate physical objects — such as printed products and fabrics — in certified images, by encoding a hidden steganographic signature directly into the object\'s printed pattern. A photo of the object can then be checked against the expected hidden signature to verify it is genuine. Funded by Trulyt Technologies Pte. Ltd.',
      tech: ['Steganography', 'Computer Vision', 'Image Authentication'],
      links: [
        { label: 'Project Page (VisTeam)', url: 'https://visteam.isr.uc.pt/projects/truim-trust-image-understanding/' }
      ],
      image: 'assets/images/projects/truim/thumb.jpg'
    },
    {
      id: 'visual-id',
      title: 'VISUAL-ID',
      category: 'isr',
      shortDescription: 'Unique visual identities for product authentication and secure ID documents.',
      affiliation: 'Institute of Systems and Robotics · University of Coimbra',
      description: 'VISUAL-ID (Unique Visual Identities in Graphics, Images and Faces) develops technology for two complementary goals: product identification and anti-counterfeiting, and civil-document authentication — all validated with commonly available devices like smartphones. On the product side, it creates visual identities with graphical codes and unique physical elements (icons, glitters, holograms, complex drawings via UniQode® technology) for stamps, labels, and documents. On the document side, it advances the TrustFace® and CodeFace® technologies for generating facial images with data encoded beyond the naked eye, decodable and validatable by smartphone. In partnership with Imprensa Nacional Casa da Moeda (INCM).',
      tech: ['Computer Vision', 'Machine Learning', 'Steganography', 'Anti-Counterfeiting'],
      links: [
        { label: 'Project Page (VisTeam)', url: 'https://visteam.isr.uc.pt/projects/visual-id-unique-visual-identities-in-graphics-images-and-faces-2/' }
      ],
      image: 'assets/images/projects/visual-id/thumb.jpg'
    },
    {
      id: 'facing',
      title: 'FACING',
      category: 'isr',
      shortDescription: 'Testing and improving face-recognition tools for ID and travel documents.',
      affiliation: 'Institute of Systems and Robotics · University of Coimbra',
      description: 'FACING ran exhaustive test batteries on INCM\'s facial-image tools for identification and travel documents, covering: processing images from medium and medium-low quality enrollment-portal cameras (including intelligent foreground/background segmentation); verifying compliance with international photo requirements for ID documents; facial recognition via feature-vector comparison for both validation (1:1) and identification (1:n); and liveness detection to distinguish a real face from fraudulent artifacts. The resulting algorithms, integrating ISR-UC technology, were implemented by INCM. Funded by Imprensa Nacional Casa da Moeda (INCM).',
      tech: ['Face Recognition', 'Computer Vision', 'Liveness Detection', 'Machine Learning'],
      links: [
        { label: 'Project Page (VisTeam)', url: 'https://visteam.isr.uc.pt/projects/facing-2/' },
        { label: 'Paper: Young Labeled Faces in the Wild (YLFW)', url: 'https://visteam.isr.uc.pt/publications/young-labeled-faces-in-the-wild-ylfw-a-dataset-for-children-faces-recognition/' },
        { label: 'Paper: Facial Biometrics for ID Document Validation', url: 'https://visteam.isr.uc.pt/publications/towards-facial-biometrics-for-id-document-validation-inmobile-devices/' }
      ],
      image: 'assets/images/projects/facing/thumb.webp'
    },
    {
      id: 'maziar',
      title: 'Maziar',
      category: 'personal',
      shortDescription: 'A native LaTeX editor and paper-submission tracker.',
      affiliation: 'Personal Project',
      description: 'Maziar is a personal LaTeX editor and paper-submission tracker that follows a paper end-to-end — venue, deadline, tasks, and rebuttal. It started as a native macOS app (SwiftUI/AppKit), with a GTK4/libadwaita + Python rewrite for Linux and a lightweight Chrome/Firefox browser extension for editing LaTeX directly with a local compile server, all kept in sync as separate, independently evolving codebases.',
      tech: ['SwiftUI', 'GTK4', 'Python', 'LaTeX', 'Browser Extension'],
      links: [
        { label: 'GitHub: macOS', url: 'https://github.com/farhadsh1992/maziar-macos' },
        { label: 'GitHub: Linux', url: 'https://github.com/farhadsh1992/maziar-linux' },
        { label: 'GitHub: Browser Extension', url: 'https://github.com/farhadsh1992/maziar-extension' }
      ],
      video: 'assets/videos/projects/maziar/demo.mp4',
      poster: 'assets/images/projects/maziar/poster.jpg',
      logo: 'assets/images/projects/maziar/logo.png'
    },
    {
      id: 'cv-autofill',
      title: 'Farhad\'s CV AutoFill',
      category: 'personal',
      shortDescription: 'A browser extension that autofills job applications with AI.',
      affiliation: 'Personal Project',
      description: 'Farhad\'s CV AutoFill is a browser extension (Chrome/Firefox/Safari/Orion) that autofills job application forms and generates tailored cover letters and CVs using AI, paired with a native SwiftUI Mac companion app that adds richer local document handling and CLI provider support via a native messaging bridge.',
      tech: ['Browser Extension', 'JavaScript', 'SwiftUI', 'AI'],
      links: [
        { label: 'GitHub: Browser Extension', url: 'https://github.com/farhadsh1992/cv-autofill-extension' },
        { label: 'GitHub: Mac App', url: 'https://github.com/farhadsh1992/cv-autofill-mac-app' }
      ],
      image: 'assets/images/projects/cv-autofill/thumb.png',
      logo: 'assets/images/projects/cv-autofill/logo.png',
      logoSize: '6.5rem',
      logoSizeModal: '9rem'
    },
    {
      id: 'xt-arm',
      title: 'XT-ARM',
      category: 'personal',
      shortDescription: 'A multi-provider AI chat app with live object and hand-gesture tracking.',
      affiliation: 'Personal Project',
      description: 'XT-ARM is a multi-provider AI chat app (sibling native builds for Linux — GTK4/libadwaita — and macOS — SwiftUI) supporting OpenAI, Claude, Kimi, DeepSeek, and Gemini per conversation. It includes file attachment and webcam photo capture as vision input, a Tasks page for quick-launch saved prompts, secure API-key storage via the system keyring, and a Live Track mode for real-time object detection and hand-gesture tracking from the webcam. More details and results coming very soon.',
      tech: ['Python', 'GTK4', 'SwiftUI', 'Computer Vision', 'AI'],
      image: 'assets/images/projects/xt-arm/thumb.png',
      logo: 'assets/images/projects/xt-arm/logo.png',
      logoSize: '5.5rem',
      logoSizeModal: '7.5rem'
    }
  ];

  function buildCard(project) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-category', project.category || '');

    var media = document.createElement('div');
    media.className = 'project-card-media';
    if (project.video) {
      var video = document.createElement('video');
      video.className = 'project-card-video';
      video.src = project.video;
      if (project.poster) video.poster = project.poster;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.setAttribute('muted', '');
      video.playsInline = true;
      media.appendChild(video);
    } else if (project.image) {
      media.style.backgroundImage = 'url(' + project.image + ')';
    } else if (project.gradient) {
      media.style.background = project.gradient;
    }

    if (project.logo) {
      var badge = document.createElement('img');
      badge.className = 'project-card-logo';
      badge.src = project.logo;
      badge.alt = '';
      if (project.logoSize) {
        badge.style.width = project.logoSize;
        badge.style.height = project.logoSize;
      }
      media.appendChild(badge);
    }

    var overlay = document.createElement('div');
    overlay.className = 'project-card-overlay';

    var title = document.createElement('h3');
    title.textContent = project.title;
    overlay.appendChild(title);

    if (project.affiliation) {
      var affiliation = document.createElement('p');
      affiliation.className = 'project-card-affiliation';
      affiliation.textContent = project.affiliation;
      overlay.appendChild(affiliation);
    }

    var desc = document.createElement('p');
    desc.textContent = project.shortDescription || '';
    overlay.appendChild(desc);
    card.appendChild(media);
    card.appendChild(overlay);

    card.addEventListener('click', function () {
      openModal(project);
    });

    return card;
  }

  function renderGrid() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;
    PROJECTS.forEach(function (project) {
      grid.appendChild(buildCard(project));
    });
  }

  var modal = null;
  var lastFocusedCard = null;

  function openModal(project) {
    if (!modal) return;

    var media = document.getElementById('project-modal-media');
    media.innerHTML = '';
    media.style.backgroundImage = '';
    media.style.background = '';
    if (project.video) {
      var modalVideo = document.createElement('video');
      modalVideo.className = 'project-modal-video';
      modalVideo.src = project.video;
      if (project.poster) modalVideo.poster = project.poster;
      modalVideo.autoplay = true;
      modalVideo.loop = true;
      modalVideo.muted = true;
      modalVideo.setAttribute('muted', '');
      modalVideo.playsInline = true;
      modalVideo.controls = true;
      media.appendChild(modalVideo);
    } else if (project.image) {
      media.style.backgroundImage = 'url(' + project.image + ')';
    } else if (project.gradient) {
      media.style.background = project.gradient;
    }

    if (project.logo) {
      var modalBadge = document.createElement('img');
      modalBadge.className = 'project-modal-logo';
      modalBadge.src = project.logo;
      modalBadge.alt = '';
      if (project.logoSizeModal) {
        modalBadge.style.width = project.logoSizeModal;
        modalBadge.style.height = project.logoSizeModal;
      }
      media.appendChild(modalBadge);
    }

    document.getElementById('project-modal-title').textContent = project.title;

    var affiliationEl = document.getElementById('project-modal-affiliation');
    affiliationEl.textContent = project.affiliation || '';
    affiliationEl.hidden = !project.affiliation;

    document.getElementById('project-modal-description').textContent = project.description || project.shortDescription || '';

    var roleEl = document.getElementById('project-modal-role');
    roleEl.innerHTML = '';
    if (project.role) {
      var roleHeading = document.createElement('h3');
      roleHeading.textContent = 'My Role';
      var roleText = document.createElement('p');
      roleText.textContent = project.role;
      roleEl.appendChild(roleHeading);
      roleEl.appendChild(roleText);
      roleEl.hidden = false;
    } else {
      roleEl.hidden = true;
    }

    var techEl = document.getElementById('project-modal-tech');
    techEl.innerHTML = '';
    (project.tech || []).forEach(function (t) {
      var chip = document.createElement('span');
      chip.className = 'project-tech-chip';
      chip.textContent = t;
      techEl.appendChild(chip);
    });

    var linksEl = document.getElementById('project-modal-links');
    linksEl.innerHTML = '';
    (project.links || []).forEach(function (l) {
      var a = document.createElement('a');
      a.className = 'download-btn download-btn--sm';
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = l.label;
      linksEl.appendChild(a);
    });

    lastFocusedCard = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.project-modal-close').focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
      lastFocusedCard.focus();
    }
  }

  function applyFilter(filter) {
    document.querySelectorAll('#projects-grid .project-card').forEach(function (card) {
      var matches = filter === 'all' || card.getAttribute('data-category') === filter;
      card.hidden = !matches;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    modal = document.getElementById('project-modal');
    if (!modal) return;

    renderGrid();

    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    var filterNav = document.getElementById('project-filter');
    if (filterNav) {
      filterNav.querySelectorAll('.project-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterNav.querySelectorAll('.project-filter-btn').forEach(function (b) {
            b.classList.remove('is-active');
          });
          btn.classList.add('is-active');
          applyFilter(btn.getAttribute('data-filter'));
        });
      });
    }
  });
})();
