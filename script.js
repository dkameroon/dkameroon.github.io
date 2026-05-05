document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link, .section-nav-link");
    const sectionNavLinks = document.querySelectorAll(".section-nav-link");
    const scrollProgress = document.querySelector(".scroll-progress");
    const backToTopButton = document.querySelector(".back-to-top");

    let activeSectionId = "";
    let sectionLabelTimeout = null;

    const showSectionLabel = (link) => {
        if (!link || !link.classList.contains("section-nav-link")) {
            return;
        }

        sectionNavLinks.forEach((item) => item.classList.remove("label-visible"));
        link.classList.add("label-visible");

        window.clearTimeout(sectionLabelTimeout);
        sectionLabelTimeout = window.setTimeout(() => {
            link.classList.remove("label-visible");
        }, 1800);
    };

    const updateScrollUI = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (navbar) {
            navbar.classList.toggle("scrolled", scrollTop > 20);
        }

        if (backToTopButton) {
            backToTopButton.classList.toggle("visible", scrollTop > 500);
        }
    };

    const updateActiveNavLink = () => {
        const sections = Array.from(document.querySelectorAll("header[id], section[id]")).filter((section) => document.querySelector(`.section-nav-link[href="#${section.id}"]`));
        const scrollPosition = window.scrollY + Math.min(220, window.innerHeight * 0.35);
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (!currentSectionId && sections.length > 0) {
            currentSectionId = sections[0].getAttribute("id");
        }

        navItems.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${currentSectionId}`);
        });

        if (currentSectionId && currentSectionId !== activeSectionId) {
            activeSectionId = currentSectionId;
            const activeSectionLink = document.querySelector(`.section-nav-link[href="#${currentSectionId}"]`);
            showSectionLabel(activeSectionLink);
        }
    };

    updateScrollUI();
    updateActiveNavLink();

    window.addEventListener("scroll", () => {
        updateScrollUI();
        updateActiveNavLink();
    }, { passive: true });

    window.addEventListener("resize", updateActiveNavLink);

    if (navToggle && navLinks && navbar) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            navToggle.classList.toggle("active", isOpen);
            navbar.classList.toggle("menu-open", isOpen);
            document.body.classList.toggle("nav-open", isOpen);
            navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.classList.remove("active");
                navbar.classList.remove("menu-open");
                document.body.classList.remove("nav-open");
                navToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });
    }

    sectionNavLinks.forEach((link) => {
        link.addEventListener("click", () => showSectionLabel(link));
    });

    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-card, .skill-category, .experience-card, .contact-layout"
    );

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                if (entry.target.classList.contains("media-section-title")) {
                    const mediaGrid = entry.target.nextElementSibling;

                    if (mediaGrid && mediaGrid.classList.contains("media-grid-reveal")) {
                        window.setTimeout(() => {
                            mediaGrid.classList.add("media-grid-visible");
                        }, 90);
                    }
                }

                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -80px 0px"
        });

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
            revealObserver.observe(element);
        });
    }

    const projectGrid = document.querySelector(".project-grid");
    const sortButtons = document.querySelectorAll(".sort-tab");

    if (projectGrid && sortButtons.length > 0) {
        const defaultCards = Array.from(projectGrid.querySelectorAll(".project-card"));

        const sortProjects = (selectedSort) => {
            let sortedCards = [...defaultCards];

            if (selectedSort === "oldest") {
                sortedCards.sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
            }

            if (selectedSort === "newest") {
                sortedCards.sort((a, b) => Number(b.dataset.order) - Number(a.dataset.order));
            }

            projectGrid.innerHTML = "";

            sortedCards.forEach((card) => {
                projectGrid.appendChild(card);
                card.classList.add("visible");
            });
        };

        const activeButton = document.querySelector(".sort-tab.active");

        if (activeButton) {
            sortProjects(activeButton.dataset.sort);
        }

        sortButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const selectedSort = button.dataset.sort;

                sortButtons.forEach((item) => item.classList.remove("active"));
                button.classList.add("active");

                sortProjects(selectedSort);
            });
        });
    }

    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const textToCopy = button.dataset.copy;

            try {
                await navigator.clipboard.writeText(textToCopy);

                button.classList.add("copied");

                setTimeout(() => {
                    button.classList.remove("copied");
                }, 1200);
            } catch (error) {
                button.classList.add("copy-error");

                setTimeout(() => {
                    button.classList.remove("copy-error");
                }, 1200);
            }
        });
    });

    const cvModal = document.querySelector("#cvPreviewModal");
    const cvPreviewFrame = document.querySelector("#cvPreviewFrame");
    const cvPreviewTitle = document.querySelector("#cvPreviewTitle");
    const cvPreviewOpenPdf = document.querySelector("#cvPreviewOpenPdf");
    const cvPreviewDownload = document.querySelector("#cvPreviewDownload");
    const cvPreviewButtons = document.querySelectorAll(".cv-preview-option");
    const cvCloseButtons = document.querySelectorAll("[data-cv-close]");

    const openCvPreview = (button) => {
        if (!cvModal || !cvPreviewFrame || !button) {
            return;
        }

        const src = button.dataset.cvSrc;
        const title = button.dataset.cvTitle || "CV Preview";
        const download = button.dataset.cvDownload || src;

        if (!src) {
            return;
        }

        cvPreviewFrame.src = src;

        if (cvPreviewTitle) {
            cvPreviewTitle.textContent = title;
        }

        if (cvPreviewOpenPdf) {
            cvPreviewOpenPdf.href = src;
        }

        if (cvPreviewDownload) {
            cvPreviewDownload.href = download;
        }

        cvModal.classList.add("open");
        cvModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("cv-preview-open");
    };

    const closeCvPreview = () => {
        if (!cvModal) {
            return;
        }

        cvModal.classList.remove("open");
        cvModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("cv-preview-open");

        if (cvPreviewFrame) {
            cvPreviewFrame.src = "";
        }
    };

    cvPreviewButtons.forEach((button) => {
        button.addEventListener("click", () => openCvPreview(button));
    });

    cvCloseButtons.forEach((button) => {
        button.addEventListener("click", closeCvPreview);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCvPreview();
        }
    });


    const projectMediaItems = Array.from(document.querySelectorAll(
        ".project-page-section .mobile-shot img, .project-page-section .mobile-shot video, .project-page-section .featured-preview img, .project-page-section .featured-preview video"
    ));

    const projectMediaImages = Array.from(document.querySelectorAll(
        ".project-page-section .mobile-shot img, .project-page-section .featured-preview img"
    ));

    projectMediaImages.forEach((image) => {
        image.loading = "eager";
        image.decoding = "sync";
    });

    const formatMediaTime = (seconds) => {
        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

        return `${minutes}:${remainingSeconds}`;
    };

    const getMediaType = (media) => media?.tagName?.toLowerCase() === "video" ? "video" : "image";

    const getMediaSource = (media) => {
        if (!media) {
            return "";
        }

        if (media.dataset.lightboxSrc) {
            return media.dataset.lightboxSrc;
        }

        if (media.tagName.toLowerCase() === "video") {
            const source = media.querySelector("source");
            return media.currentSrc || media.src || source?.src || "";
        }

        return media.currentSrc || media.src || "";
    };

    const stopPreviewVideos = () => {
        document.querySelectorAll(".project-short-video").forEach((video) => {
            if (!video.paused) {
                video.pause();
            }
        });
    };

    const playPreviewVideos = () => {
        document.querySelectorAll(".project-short-video").forEach((video) => {
            video.muted = true;
            video.play().catch(() => {});
        });
    };

    if (projectMediaItems.length > 0) {
        const lightbox = document.createElement("div");
        lightbox.className = "image-lightbox";
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.innerHTML = `
            <div class="image-lightbox-backdrop" data-lightbox-close></div>
            <div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Project media preview">
                <button class="image-lightbox-close" type="button" aria-label="Close media preview" data-lightbox-close>
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button class="image-lightbox-arrow image-lightbox-prev" type="button" aria-label="Previous media item">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <div class="image-lightbox-media-frame">
                    <img class="image-lightbox-img" src="" alt="">
                    <video class="image-lightbox-video"
                           playsinline
                           preload="auto"
                           hidden></video>
                    <button class="custom-video-center-button" type="button" aria-label="Play or pause video">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="custom-video-button custom-video-mute custom-video-corner-button" type="button" aria-label="Mute or unmute video">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <button class="image-lightbox-arrow image-lightbox-next" type="button" aria-label="Next media item">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="image-lightbox-counter"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector(".image-lightbox-img");
        const lightboxVideo = lightbox.querySelector(".image-lightbox-video");
        const mediaFrame = lightbox.querySelector(".image-lightbox-media-frame");
        const lightboxCounter = lightbox.querySelector(".image-lightbox-counter");
        const closeLightboxButtons = lightbox.querySelectorAll("[data-lightbox-close]");
        const previousButton = lightbox.querySelector(".image-lightbox-prev");
        const nextButton = lightbox.querySelector(".image-lightbox-next");
        const centerPlayButton = lightbox.querySelector(".custom-video-center-button");
        const muteToggleButton = lightbox.querySelector(".custom-video-mute");

        let currentMediaIndex = 0;
        let activeLightboxVideo = null;
        let activeVideoPlaceholder = null;
        let activeVideoParent = null;
        let activeVideoNextSibling = null;
        let activeVideoBadge = null;

        const updateVideoOverlayLayout = () => {
            if (!mediaFrame || !activeLightboxVideo) {
                return;
            }

            const videoRect = activeLightboxVideo.getBoundingClientRect();
            const frameRect = mediaFrame.getBoundingClientRect();
            const videoLeft = Math.max(0, videoRect.left - frameRect.left);
            const videoTop = Math.max(0, videoRect.top - frameRect.top);
            const videoWidth = activeLightboxVideo.offsetWidth;
            const videoHeight = activeLightboxVideo.offsetHeight;

            if (muteToggleButton) {
                muteToggleButton.style.left = `${videoLeft + 12}px`;
                muteToggleButton.style.top = `${videoTop + 12}px`;
            }

            if (centerPlayButton) {
                centerPlayButton.style.left = `${videoLeft + (videoWidth / 2)}px`;
                centerPlayButton.style.top = `${videoTop + (videoHeight / 2)}px`;
            }
        };

        const updateVideoControlState = () => {
            if (!mediaFrame) {
                return;
            }

            const isVideoActive = Boolean(activeLightboxVideo);
            const isPaused = !activeLightboxVideo || activeLightboxVideo.paused;

            mediaFrame.classList.toggle("is-paused", isVideoActive && isPaused);

            if (centerPlayButton) {
                centerPlayButton.hidden = !isVideoActive;
                centerPlayButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
                centerPlayButton.setAttribute("aria-label", isPaused ? "Resume video" : "Pause video");
            }

            if (muteToggleButton) {
                muteToggleButton.hidden = !isVideoActive;
                const isMuted = !activeLightboxVideo || activeLightboxVideo.muted;
                muteToggleButton.innerHTML = `<i class="fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}"></i>`;
                muteToggleButton.setAttribute("aria-label", isMuted ? "Unmute video" : "Mute video");
            }

            updateVideoOverlayLayout();
        };

        const toggleActiveVideoPlayback = () => {
            if (!activeLightboxVideo) {
                return;
            }

            if (activeLightboxVideo.paused) {
                activeLightboxVideo.play().catch(() => {});
            } else {
                activeLightboxVideo.pause();
            }
        };

        const clearLightboxMedia = () => {
            if (lightboxImg) {
                lightboxImg.src = "";
                lightboxImg.alt = "";
                lightboxImg.hidden = true;
            }

            if (activeLightboxVideo) {
                activeLightboxVideo.pause();
                activeLightboxVideo.muted = true;
                activeLightboxVideo.onplay = null;
                activeLightboxVideo.onpause = null;
                activeLightboxVideo.onvolumechange = null;
                activeLightboxVideo.ontimeupdate = null;
                activeLightboxVideo.onloadedmetadata = null;
                activeLightboxVideo.onended = null;
                activeLightboxVideo.classList.remove("image-lightbox-video");
                activeLightboxVideo.classList.add("project-short-video");

                if (activeVideoPlaceholder?.parentNode) {
                    activeVideoPlaceholder.parentNode.replaceChild(activeLightboxVideo, activeVideoPlaceholder);
                } else if (activeVideoParent) {
                    activeVideoParent.insertBefore(activeLightboxVideo, activeVideoNextSibling);
                }

                if (activeVideoBadge) {
                    activeVideoBadge.hidden = false;
                }

                activeLightboxVideo = null;
                activeVideoPlaceholder = null;
                activeVideoParent = null;
                activeVideoNextSibling = null;
                activeVideoBadge = null;
            }

            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.hidden = true;
            }

            lightbox.classList.remove("video-mode");
            mediaFrame?.classList.remove("has-video");
            mediaFrame?.classList.remove("is-paused");
            updateVideoControlState();
        };

        const playVideoInLightbox = (video) => {
            if (!video || !mediaFrame) {
                return;
            }

            activeVideoParent = video.parentNode;
            activeVideoNextSibling = video.nextSibling;
            activeVideoPlaceholder = document.createComment("lightbox-video-placeholder");
            activeVideoBadge = activeVideoParent?.querySelector(".video-card-badge") || null;

            activeVideoParent?.insertBefore(activeVideoPlaceholder, video);
            mediaFrame.appendChild(video);

            activeLightboxVideo = video;
            activeLightboxVideo.classList.remove("project-short-video");
            activeLightboxVideo.classList.add("image-lightbox-video");
            activeLightboxVideo.controls = false;
            activeLightboxVideo.muted = false;
            activeLightboxVideo.volume = 1;
            activeLightboxVideo.playsInline = true;

            if (activeVideoBadge) {
                activeVideoBadge.hidden = true;
            }

            lightbox.classList.add("video-mode");
            mediaFrame?.classList.add("has-video");
            activeLightboxVideo.play().catch(() => {});
            activeLightboxVideo.onplay = updateVideoControlState;
            activeLightboxVideo.onpause = updateVideoControlState;
            activeLightboxVideo.onvolumechange = updateVideoControlState;
            activeLightboxVideo.onended = updateVideoControlState;
            activeLightboxVideo.onloadedmetadata = updateVideoOverlayLayout;
            updateVideoControlState();
            requestAnimationFrame(updateVideoOverlayLayout);
        };

        const updateLightboxMedia = () => {
            const media = projectMediaItems[currentMediaIndex];

            if (!media) {
                return;
            }

            const mediaType = getMediaType(media);
            const mediaSource = getMediaSource(media);

            clearLightboxMedia();

            if (mediaType === "video") {
                playVideoInLightbox(media);
            } else if (lightboxImg) {
                lightboxImg.src = mediaSource;
                lightboxImg.alt = media.alt || "Project screenshot";
                lightboxImg.hidden = false;
            }

            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentMediaIndex + 1} / ${projectMediaItems.length}`;
            }
        };

        const openLightbox = (index) => {
            currentMediaIndex = index;
            stopPreviewVideos();
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
            updateLightboxMedia();
        };

        const closeLightbox = () => {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("lightbox-open");
            clearLightboxMedia();
            playPreviewVideos();
        };

        const showPreviousMedia = () => {
            currentMediaIndex = (currentMediaIndex - 1 + projectMediaItems.length) % projectMediaItems.length;
            updateLightboxMedia();
        };

        const showNextMedia = () => {
            currentMediaIndex = (currentMediaIndex + 1) % projectMediaItems.length;
            updateLightboxMedia();
        };

        projectMediaItems.forEach((media, index) => {
            media.closest(".mobile-shot, .featured-preview")?.classList.add("lightbox-enabled");
            media.addEventListener("click", (event) => {
                if (lightbox.classList.contains("open")) {
                    return;
                }

                openLightbox(index);
            });
        });

        mediaFrame?.addEventListener("click", () => {
            if (!activeLightboxVideo) {
                return;
            }

            toggleActiveVideoPlayback();
        });

        centerPlayButton?.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleActiveVideoPlayback();
        });

        muteToggleButton?.addEventListener("click", (event) => {
            event.stopPropagation();

            if (!activeLightboxVideo) {
                return;
            }

            activeLightboxVideo.muted = !activeLightboxVideo.muted;
            updateVideoControlState();
        });

        closeLightboxButtons.forEach((button) => {
            button.addEventListener("click", closeLightbox);
        });

        previousButton?.addEventListener("click", showPreviousMedia);
        nextButton?.addEventListener("click", showNextMedia);

        document.addEventListener("keydown", (event) => {
            if (!lightbox.classList.contains("open")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showPreviousMedia();
            }

            if (event.key === "ArrowRight") {
                showNextMedia();
            }

            if (event.key === " " && activeLightboxVideo) {
                event.preventDefault();
                toggleActiveVideoPlayback();
            }
        });

        window.addEventListener("resize", () => {
            if (!lightbox.classList.contains("open") || !activeLightboxVideo) {
                return;
            }

            updateVideoOverlayLayout();
        });
    }


    const pageLoadingFeedback = document.createElement("div");
    pageLoadingFeedback.className = "page-loading-feedback";
    pageLoadingFeedback.setAttribute("aria-hidden", "true");
    document.body.appendChild(pageLoadingFeedback);

    const isInternalPageLink = (link) => {
        if (!link || !link.href) {
            return false;
        }

        const url = new URL(link.href, window.location.href);

        return url.origin === window.location.origin
            && url.pathname !== window.location.pathname
            && !link.hasAttribute("download")
            && !link.target
            && !link.href.startsWith("mailto:")
            && !link.href.startsWith("tel:");
    };

    document.querySelectorAll("a[href]").forEach((link) => {
        if (!isInternalPageLink(link)) {
            return;
        }

        link.addEventListener("click", (event) => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                return;
            }

            event.preventDefault();
            pageLoadingFeedback.classList.add("active");
            pageLoadingFeedback.setAttribute("aria-hidden", "false");

            window.setTimeout(() => {
                window.location.href = link.href;
            }, 190);
        });
    });

});
