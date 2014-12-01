$(Body_Load);

/* Pre-load background images so transitions are smooth */
var background2= new Image(1600,1200)
background2.src = 'Images/table-background.jpg';

var background3  = new Image(1600,1200)
background3.src = 'Images/magnets-background.jpg';

var background4 = new Image(1600,1200)
background4.src = 'Images/wood-background.jpg';


function PageController() {

}

PageController.prototype.Initialize = function () {
    var self = this;
    
    var allBindings = $('*[data-controller]');
    var bindings = allBindings.filter('*[data-controller=Page]');
    
    for (var i = 0; i < bindings.length; i++) {
        var binding = $(bindings[i]);
        self[binding.attr('data-name')] = binding;
    }
    
    self.CurrentMenuItem = null;
    self.CurrentSubMenuItem = null;
    self.CurrentSubMenu = null;
    self.CurrentBannerAnimation = null;
    self.CurrentContentAnimation = null;
    
    self.WhatsNewImages = self.WhatsNewBanner.find('.slide');
    self.CurrentNextImageIndex = 0;
    self.ShowNextWhatsNewImage();
    
    self.ContentTransition.find('.right .transition-border').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',
                                                                    function(e) { self.ContentTransition.removeClass('is-animated'); });

    // Who
    self.NavWho.bind('click', function (e) { self.ShowSubMenu($(e.currentTarget), self.SubSectionWho, self.NavWhoWeAre, 'office'); });
    self.NavWhoWeAre.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhoWeAreBanner); });
    self.NavOurPhilosophy.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurPhilosophyBanner, self.OurPhilosophyContent); });
    self.NavOurPeople.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurPeopleBanner, self.OurPeopleContent); });
    
    // What
    self.NavWhat.bind('click', function (e) { self.ShowSubMenu($(e.currentTarget), self.SubSectionWhat, self.NavWhatWeDo, 'table'); });
    self.NavWhatWeDo.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhatWeDoBanner, self.WhatWeDoContent); });
    self.NavOurProcess.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurProcessBanner); });
    self.NavOurServices.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.OurServicesBanner); });
    self.NavWhatsNew.bind('click', function (e) { self.ShowAnimation($(e.currentTarget), self.WhatsNewBanner); });
    
    setInterval(function () { self.Interval_Tick(); }, 3000);
    
    setTimeout(function() {
        self.NavWho.trigger('click');
    }, 200);

    return self;
};

PageController.prototype.ShowSubMenu = function(target, subMenu, defaultSubMenuItem, backgroundId) {
    var self = this;
    
    if (self.CurrentMenuItem)
        self.CurrentMenuItem.removeClass('is-selected');
    
    self.CurrentMenuItem = target;
    
    if (self.CurrentSubMenu)
        self.CurrentSubMenu.removeClass('is-active').removeClass('is-expanded');
    
    self.CurrentSubMenu = subMenu;
    
    self.SectionBackground.removeClass('transparent-background-cover-office transparent-background-cover-table transparent-background-cover-magnets transparent-background-cover-wood');
    
    setTimeout(function() {
        target.addClass('is-selected');
        self.CurrentSubMenu.addClass('is-active');
    self.SectionBackground.addClass('transparent-background-cover-' + backgroundId);
    }, 100);
    
    setTimeout(function() {
        self.CurrentSubMenu.addClass('is-expanded');
        defaultSubMenuItem.trigger('click');
    }, 200);
};

PageController.prototype.ShowAnimation = function(target, bannerAnimation, contentAnimation) {
    var self = this;
    
    if (self.CurrentSubMenuItem)
        self.CurrentSubMenuItem.removeClass('is-selected');
        
    if (self.CurrentBannerAnimation)
        self.CurrentBannerAnimation.removeClass('is-animated');
    
    self.WhiteFlash.removeClass('is-animated');
    self.ContentTransition.removeClass('is-animated');
    self.CurrentSubMenuItem = target;
    self.CurrentBannerAnimation = bannerAnimation;
    
    // Content animation -------------
    if (self.CurrentContentAnimation)
        self.CurrentContentAnimation.removeClass('is-animated');
    
    self.CurrentContentAnimation = contentAnimation;
    
    if (self.CurrentContentAnimation)
        self.Content.addClass('is-visible');
    else
        self.Content.removeClass('is-visible');
    
    setTimeout(function() {
        self.CurrentSubMenuItem.addClass('is-selected');
        self.WhiteFlash.addClass('is-animated');
        self.CurrentBannerAnimation.addClass('is-animated');
        
        if (self.CurrentContentAnimation) {
            self.ContentTransition.addClass('is-animated');
            self.CurrentContentAnimation.addClass('is-animated');
        }
    }, 100);
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