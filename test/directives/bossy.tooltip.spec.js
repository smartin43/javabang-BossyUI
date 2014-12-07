describe("bossyTooltip",function(){
    var element;
    var scope;
    var compile;
    var val;

    beforeEach(module('Templates'))
    beforeEach(inject(function($compile,$rootScope){
        scope=$rootScope;
        compile  = $compile;
        val = true;
        element = angular.element('<bossyTooltip title="" body=""></bossyTooltip>');
        $compile(element)(scope);
        $rootScope.$digest();

    }));
    
    it('should add bossy tooltip without title',function(){
        expect(element.attr("title")).toMatch("")
    })
    
    it('should add bossy tooltip without body',function(){
        expect(element.attr("body")).toMatch("")
    })
});

describe("bossyTooltip",function(){
    var element;
    var scope;
    var compile;
    var val;

    beforeEach(module('Templates'))
    beforeEach(inject(function($compile,$rootScope){
        scope=$rootScope;
        compile  = $compile;
        val = true;
        element = angular.element('<bossyTooltip title="Test Tooltip" body=""></bossyTooltip>');
        $compile(element)(scope);
        $rootScope.$digest();

    }));
    
    it('should add bossy tooltip with title',function(){
        expect(element.attr("title")).toMatch("Test Tooltip")
    })
    
    it('should add bossy tooltip without body',function(){
        expect(element.attr("body")).toMatch("")
    })
});

describe("bossyTooltip",function(){
    var element;
    var scope;
    var compile;
    var val;

    beforeEach(module('Templates'))
    beforeEach(inject(function($compile,$rootScope){
        scope=$rootScope;
        compile  = $compile;
        val = true;
        element = angular.element('<bossyTooltip title="Test Tooltip" body="This is the tooltip body" position="n"></bossyTooltip>');
        $compile(element)(scope);
        $rootScope.$digest();

    }));
    
    it('should add bossy tooltip with title',function(){
        expect(element.attr("title")).toMatch("Test Tooltip")
    })
    
    it('should add bossy tooltip with body',function(){
        expect(element.attr("body")).toMatch("This is the tooltip body")
    })
    
    it('should add bossy tooltip',function(){
        expect(element.attr("position")).toMatch("e")
    })
});