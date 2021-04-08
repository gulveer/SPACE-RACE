var Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2StaticBody = Box2D.Dynamics.b2Body.b2_staticBody;
var b2DynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody;
var b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
var b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
var b2FilterData = Box2D.Dynamics.b2FilterData;
var b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
var b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
var b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;
var b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
var world;
var SCALE = 30;
var groundBody;
var wheels = [];
var grounds = [];
var car;
var panX = 0;
var panY = 0;
var leftDown = false;
var rightDown = false;
var listener = new Box2D.dynamics.b2ContactListener;
var backgroundImage;
var carSprite; 
var headSprite; 
var cbHead = false; 
var wheelSprite; 
//collisionCatagories i.e what it is 
var WHEEL_CATEGORY = 0x0001; 
var CHASSIS_CATEGORY = 0X0002; 
var GRASS_CATEGORY = 0X0004; 
var DIRT_CATEGORY = 0x0008; 
var PERSON_CATEGORY = 0x0010; 
//collision Masks ie. what it collides with 
var WHEEL_MASK = (GRASS_CATEGORY); 
var CHASSIS_MASK = (DIRT_CATEGORY); 
var GRASS_MASK = (WHEEL_CATEGORY | PERSON_CATEGORY); 
var DIRT_MASK = (CHASSIS_CATEGORY); 
var PERSON_MASK = (GRASS_CATEGORY); 
var resetCounter = 120; 
var reset = false;

function preload() {
backgroundImage = loadImage("images/CAR BACKGROUND-2");

}

function setup() {
window.canvas = createCanvas(1000, 500); 
canvas.parent("canvas"); 
frameRate(30); 
headSprite = loadImage("Pics/head.png"); 
carSprite = loadImage("images/TEST CAR.png"); 
wheelSprite = loadImage("Pics/wheel.png"); 
world = new b2World(new Vec2(0, 10), true); 
car = new Car(150, 0); 
grounds.push(new Ground()); 
world.SetContactListener(listener);



}

function draw() { 
  background(backgroundImage); 
  world.Step(1 / 30, 10, 10); 
  for (var i of wheels) 
  { 
    i.show(); 
  }
  // Only show the ground that we can see 
  grounds.filter(ground => (ground.x < panX && panX < ground.nextGroundX) || 
  (panX < ground.x && ground.x < panX + canvas.width)) .forEach(ground => ground.show());

  drawSprites();
}