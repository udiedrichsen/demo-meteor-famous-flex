Meteor.startup(function(){
  require([], function() {
  var Engine              = famous.core.Engine;
  var Surface             = famous.core.Surface;
  var Transform           = famous.core.Transform;
  var Modifier            = famous.core.Modifier;
  var ContainerSurface    = famous.surfaces.ContainerSurface;
  var FlexScrollView      = famousflex.FlexScrollView;
  var ListLayout          = famousflex.layouts.ListLayout;
    
  var mainContext         = Engine.createContext(document.getElementById('famousAppContent'));
                
  
  ////////////FAMOUS FLEX////////////////////
  var _scrollView = new FlexScrollView({
    layout: ListLayout,
    layoutOptions: {
      spacing: 10
    },
    flow: true,
    autoPipeEvents: true,
    useContainer: true,
    container: { // options passed to the ContainerSurface
      properties: {
        overflow: 'hidden'
      }
    }
  });
  var temp;
  for (var i = 0; i < 40; i++) {
    temp = new Surface({
      content: "Surface: " + (i + 1),
      size: [undefined, 200],
      properties: {
        backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
        lineHeight: "200px",
        textAlign: "center"
      }
    });  
    _scrollView.push(temp, {
      opacity: 0
    });
  }
  
  var container = new ContainerSurface({
    transform:  Transform.translate(0, 0, 0),
    size: function(){
      return [undefined, window.innerHeight - 50]
    },
    classes: ['famous-container'],
    properties: {
      overflow: 'hidden'
    }
  });
  
  // app
  container
  .add(new Modifier({
    size: [undefined, undefined],
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  }))
  .add(_scrollView);

  // display
  // http://jsbin.com/lequy/3/embed?js,output
  var size = [undefined, undefined];
  Engine.nextTick(function() {
    console.log('After tick=' + mainContext.getSize());
    size = mainContext.getSize();
    container.setOptions({size: [size[0], size[1]]});
    mainContext.add(container);
  });

  mainContext.on('resize', function(e) {
    console.log('mainContext After resize=' + mainContext.getSize());
    size = mainContext.getSize();
    if (container)
      container.setOptions({size: [size[0], size[1]]});
  }.bind(this));

 });

});