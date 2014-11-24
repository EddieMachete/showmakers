$(Body_Load);

function PageController() {

}

PageController.prototype.Initialize = function () {
    var self = this;
    
    self.LoadTemplates();
    var allBindings = $('*[data-controller]');
    var bindings = allBindings.filter('*[data-controller=Page]');
    
    for (var i = 0; i < bindings.length; i++) {
        var binding = $(bindings[i]);
        self[binding.attr('data-name')] = binding;
    }
    
    self.CurrentMenuItem = self.NavWho;
    self.CurrentSubMenuItem = self.NavWhoWeAre;
    self.CurrentSubMenu = self.SubSectionWho;
    self.CurrentAnimation = self.WhoWeAreBanner;
    
    self.WhatsNewImages = self.WhatsNewBanner.find('.slide');
    self.CurrentNextImageIndex = 0;
    self.ShowNextWhatsNewImage();

    // Who
    self.NavWho.bind('click', function (e) { self.ShowSubMenu($(e.currentTarget), self.SubSectionWho); });
    self.NavWhoWeAre.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhoWeAreBanner); });
    self.NavOurPhilosophy.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurPhilosophyBanner); });
    self.NavOurPhilosophy.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurPhilosophyBanner, self.OurPhilosophyContent); });
    
    // What
    self.NavWhat.bind('click', function (e) { self.ShowSubMenu($(e.currentTarget), self.SubSectionWhat); });
    self.NavWhatWeDo.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhatWeDoBanner); });
    self.NavOurProcess.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurProcessBanner); });
    self.NavOurServices.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurServicesBanner); });
    self.NavWhatsNew.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhatsNewBanner); });
    
    setInterval(function () { self.Interval_Tick(); }, 3000);

    return self;
};

PageController.prototype.ShowSubMenu = function(target, subMenu) {
    var self = this;
    
    self.CurrentMenuItem.removeClass('is-selected');
    self.CurrentMenuItem = target;
    
    self.CurrentSubMenu.removeClass('is-active').removeClass('is-expanded');
    self.CurrentSubMenu = subMenu;
    
    setTimeout(function() {
        target.addClass('is-selected');
        self.CurrentSubMenu.addClass('is-active');
    }, 100);
    
    setTimeout(function() {
        self.CurrentSubMenu.addClass('is-expanded');
    }, 200);
};

PageController.prototype.ShowAnimation = function(target, animation) {
    var self = this;
    
    self.CurrentSubMenuItem.removeClass('is-selected');
    self.CurrentAnimation.removeClass('is-animated');
    self.WhiteFlash.removeClass('is-animated');
    self.CurrentSubMenuItem = target;
    self.CurrentAnimation = animation;
    
    setTimeout(function() {
        self.CurrentSubMenuItem.addClass('is-selected');
        self.WhiteFlash.addClass('is-animated');
        self.CurrentAnimation.addClass('is-animated');
    }, 100);
};

PageController.prototype.LoadTemplates = function() {
    //var link = document.querySelector('link[rel=import]');
    var readableGradient = document.querySelector('.readable-gradient');
    var mainContent = document.querySelector('.main-content');
    
    // Who
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('WhoWeAreBannerTemplate', '.who-we-are-banner'), true));
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('OurPhilosophyBannerTemplate', '.our-philosophy-banner'), true));
    //mainContent.appendChild(document.importNode(GetAnimationFromTemplate('OurPhilosophyContentTemplate', '.our-philosophy-content')), true)
    // What
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('WhatWeDoBannerTemplate', '.what-we-do-banner'), true));
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('OurProcessBannerTemplate', '.our-process-banner'), true));
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('OurServicesBannerTemplate', '.our-services-banner'), true));
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('WhatsNewBannerTemplate', '.whats-new-banner'), true));
    
    readableGradient.appendChild(document.importNode(GetAnimationFromTemplate('WhiteFlashTemplate', '.white-flash'), true));
    
    function GetAnimationFromTemplate(templateId, animationClass) {
        var template = document.getElementById(templateId);
        var animation = template.import.querySelector(animationClass);
        //animation.className += ' is-animated';
        
        return animation;
    }
};

PageController.prototype.ShowNextWhatsNewImage = function() {
    var self = this;
    
    $(self.WhatsNewImages[self.CurrentNextImageIndex]).removeClass('is-visible'); //.css('z-index', 0)
    self.CurrentNextImageIndex = self.CurrentNextImageIndex > self.WhatsNewImages.length - 2 ? 0 : self.CurrentNextImageIndex + 1;
    $(self.WhatsNewImages[self.CurrentNextImageIndex]).addClass('is-visible');
};

PageController.prototype.Interval_Tick = function() {
    var self = this;
    
    if (!self.WhatsNewBanner.hasClass('is-animated'))
        return;
    
    self.ShowNextWhatsNewImage();
};

function Body_Load(e) {
    var pageController = (new PageController())
        .Initialize();

}