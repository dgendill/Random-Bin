//!OpenSCAD
$fn=20;  //increase this to render smoother circles


//frameDiam is the diameter to the center of the base frame.

roundLoom(frameHeight = 2,frameDiam = 14, frameWidth = 2,	//set the frame geometry
		nPins=24, pinHeight=3,pinDiam=1,    			//set the pin geometry
		addKnobs=true,knobDiam = 1.3,				// set the knob on the top of each pin
		addSide=true,sideHeight=2);          			// add a pin on the side?	


module roundLoom(frameHeight=5,frameDiam = 40,frameWidth=5,
			nPins=24,pinHeight=10,pinDiam=4,
			addKnobs=true,knobDiam=6,
			addside=true,sideHeight=10)
{
  union() {
    frame(frameHeight,frameDiam,frameWidth);
    for (i=[0:nPins]) {
      translate([sin(360*(i+0.5)/nPins)*frameDiam/2, cos(360*(i+0.5)/nPins)*frameDiam/2,frameHeight/2]) 
		pin(pinHeight,pinDiam,addKnobs,knobDiam);
    }
    if (addSide) {
      translate([sin(0)*(frameDiam+frameWidth)/2,cos(0)*(frameDiam+frameWidth)/2,0]) 
		rotate(a=-90,v=[1,0,0]) 
			pin(sideHeight,pinDiam,addKnobs,knobDiam);
    }
  }
}


module frame (height=5,diam=40,width=5) {
  difference() { 
    cylinder(r=diam/2+width/2,h=height,center=true);
    cylinder(r=diam/2-width/2,h=height,center=true);
  }
}


module pin(pinHeight=10,pinDiam=4,addKnobs=true,knobDiam=6)
{
  union() {
    cylinder(r=pinDiam/2,h=pinHeight);
    
    // scale (v=[2,1,1]) cylinder(h = 10, r=20);
    //scale(v=[1,.5,1], cylinder(r=pinDiam/2,h=pinHeight));
    
    
    if (addKnobs) {
        translate ([0,0,pinHeight])
        scale(v=[1,1,.5])
        sphere(r=knobDiam/2);
        
    }
 }
}
