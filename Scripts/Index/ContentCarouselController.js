function ContentCarouselController() {
}

ContentCarouselController.prototype.SetView = function(view) {
    if (!view)
        throw 'ContentCarouselController:SetView - parameter view is null.';
    
    this.View = view;
    this.Items = [];
    
    var items = this.View.find('[data-controller=ContentCarouselItem]');
    
    for (var i=0; i<items.length; i++)
        this.Items.push((new ContentCarouselItemController()).SetView($(items[i])));
    
    
    this.CurrentIndex = this.Items.length - 1;
    
    var self = this;
    
    if (this.Items.length > 0)
        setInterval(function() { self.Interval_Tick();}, 6000)
    
    return this;
};

ContentCarouselController.prototype.ShowNext = function() {
    this.Items[this.CurrentIndex].Hide();
    this.CurrentIndex = this.CurrentIndex >= this.Items.length - 1 ? 0 : this.CurrentIndex + 1;
    this.Items[this.CurrentIndex].Show();
};

ContentCarouselController.prototype.Hide = function() {
    this.Items[this.CurrentIndex].Hide();
    this.View.removeClass('is-visible');
};

ContentCarouselController.prototype.Show = function() {
    this.View.addClass('is-visible');
    this.Items[this.CurrentIndex].Show();
};

ContentCarouselController.prototype.Interval_Tick = function() {
    if (this.View.hasClass('is-visible'))
    this.ShowNext();
};

// -- ContentCarouselItemController --------------------

function ContentCarouselItemController() {
    
}

ContentCarouselItemController.prototype.SetView = function(view) {
    if (!view)
        throw 'ContentCarouselItemController:SetView - parameter view is null.';
    
    this.View = view;
    
    return this;
};

ContentCarouselItemController.prototype.Hide = function() {
    this.View.removeClass('is-visible');
};

ContentCarouselItemController.prototype.Show = function() {
    this.View.addClass('is-visible');
};