class Wheel {
    constructor(x,y,r,chasisbody) {
    this.startingPosition = createVector(x,y);
    this.radius = r;
    this.body;
    this.createBody();
    this.rimbody;
    let bodydef = new b2BodyDef();
    bodydef.type = b2DynamicBody;  
    bodydef.position.x = this.startingPosition.x/SCALE; 
    bodydef.position.y = this.startingPosition.y/SCALE;
    bodydef.angle = 0;
    let fixdef = new b2FixtureDef();
    fixdef.density = 0.05;
    fixdef.friction = 0.99;
    fixdef.restitution = 0.2;
    fixdef.shape = new b2CircleShape(this.radius/SCALE);
    this.rimbody = world.createBody(bodydef);
    var filtData = new b2FilterData();
    filtdata.groupIndex = -1;
    this.rimbody.createFixture(fixdef).SetFilterData(filtdata);

    if(chasisbody != null){
    var revJointDef = new b2RevoluteJointDef();
    revJointDef.Intialize(this.body, this.rimbody, this.body.GetPosition());
    this.joint = world.CreateJoint(revJointDef);
    }

    if(chasisbody != null){
    var prisJointDef = new b2PrismaticJointDef();
    prisJointDef.intialize(this.rimbody, chasisbody, this.body.GetPosition(), new Vec2(0,-1));
    this.prisjoint = world.CreateJoint(prisJointDef);
    var distJointDef = new b2DistanceJointDef();
    var anchorWheel = new Vec2(x/SCALE, y/SCALE);
    var anchorCar = new Vec2((x)/SCALE, (y-r*3)/SCALE);
    distJointDef.intialize(this.rimbody, chasisbody, anchorWheel, anchorCar);
    distJointDef.frequencyHz = 70;
    distJointDef.dampingRatio = 25;
    this.distJoint = world.createJoint(distJointDef);
}
this.body.setAngularDaming(1.8);
}
    
createBody() { 
    let bodyDef = new b2BodyDef(); 
    bodyDef.type = b2DynamicBody; 
    bodyDef.position.x = this.startingPosition.x / SCALE; 
    bodyDef.position.y = this.startingPosition.y / SCALE; 
    bodyDef.angle = 0; 
    let fixDef = new b2FixtureDef(); 
    fixDef.density = 1; 
    fixDef.friction = 1.5; 
    //0.99; fixDef.restitution = 0.1; 
    fixDef.shape = new b2CircleShape(this.radius / SCALE); 
    this.body = world.CreateBody(bodyDef); 
    var filtData = new b2FilterData(); 
    // filtData.groupIndex = -1; 
    filtData.categoryBits = WHEEL_CATEGORY; 
    filtData.maskBits = WHEEL_MASK; 
    this.body.CreateFixture(fixDef).SetFilterData(filtData); 
}

show() { 
    push(); 
    let x = this.body.GetPosition().x * SCALE; 
    let y = this.body.GetPosition().y * SCALE; 
    let angle = this.body.GetAngle(); 
    translate(x - panX, y - panY); rotate(angle); 
    // fill(255, 0, 0); // noStroke(); 
    // ellipse(0, 0, this.radius * 2); 
    // stroke(0); 
    // line(0, 0, this.radius - 2, 0); 
    image(wheelSprite, -this.radius, -this.radius, this.radius * 2, this.radius * 2); 
    pop(); 
}

};