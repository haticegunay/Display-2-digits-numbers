//Hatice Günay-160315029
//Zeynep Züleyha Kıroğlu-160135029
var canvas;
var gl;
var program;
var bufferNum1, bufferNum2, num1Vertices, num2Vertices;
var vPosition;
var transformationMatrix, transformationMatrixLoc;

var colorLoc, mvLoc;
var red=1.0;
var green;
var blue;

var positionx = 0.0;
var positiony = 0.0;
var myLoc;
var scaleX = 1;
var scaleY = 1;
var rotation = 0;

var number = 29;
var a = 0.0
var indices,indices_1,indices_10 = [];
var digit;
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
    a = 0.1;// for setting the object position. a = 0.1 means that, number will be on right side
    vertices_sag = [
        -0.15+a,0.25,0.0,	-0.05+a,0.25,0.0,  0.05+a,0.25,0.0,  0.15+a,0.25,0.0, //v0, v1,v2,v3
		-0.15+a,0.15,0.0,	-0.05+a,0.15,0.0,  0.05+a,0.15,0.0,  0.15+a,0.15,0.0, //v4,v5,v6,v7
		-0.15+a,0.05,0.0,   -0.05+a,0.05,0.0,  0.05+a,0.05,0.0,  0.15+a,0.05,0.0, //v8,v9,v10,v11
		-0.15+a,-0.05,0.0,  -0.05+a,-0.05,0.0,  0.05+a,-0.05,0.0,  0.15+a,-0.05,0.0, //v12,v13,v14,v15
		-0.15+a,-0.15,0.0,  -0.05+a,-0.15,0.0,  0.05+a,-0.15,0.0,  0.15+a,-0.15,0.0, //v16,v17,v18,v19
		-0.15+a,-0.25,0.0,  -0.05+a,-0.25,0.0,  0.05+a,-0.25,0.0,  0.15+a,-0.25,0.0 //v20,v21,v22,v23
    ];
	
	a = -0.3; // number will be on left side
	vertices_sol = [
        -0.15+a,0.25,0.0,	-0.05+a,0.25,0.0,  0.05+a,0.25,0.0,  0.15+a,0.25,0.0, //v0, v1,v2,v3
		-0.15+a,0.15,0.0,	-0.05+a,0.15,0.0,  0.05+a,0.15,0.0,  0.15+a,0.15,0.0, //v4,v5,v6,v7
		-0.15+a,0.05,0.0,   -0.05+a,0.05,0.0,  0.05+a,0.05,0.0,  0.15+a,0.05,0.0, //v8,v9,v10,v11
		-0.15+a,-0.05,0.0,  -0.05+a,-0.05,0.0,  0.05+a,-0.05,0.0,  0.15+a,-0.05,0.0, //v12,v13,v14,v15
		-0.15+a,-0.15,0.0,  -0.05+a,-0.15,0.0,  0.05+a,-0.15,0.0,  0.15+a,-0.15,0.0, //v16,v17,v18,v19
		-0.15+a,-0.25,0.0,  -0.05+a,-0.25,0.0,  0.05+a,-0.25,0.0,  0.15+a,-0.25,0.0 //v20,v21,v22,v23
    ];
	
	indices0 = [0,3,4, 4,7,3,  0,20,1, 20,21,1,  16,20,23, 16,19,23,  2,3,22, 22,3,23 ];
	indices1 = [2,3,22, 22,3,23 ];
	indices3 = [0,3,4, 4,7,3,  16,20,23, 16,19,23,  2,3,22, 22,3,23,  8,12,11, 12,15,11]
	indices2 = [0,3,4, 4,7,3,  2,14,15, 2,15,3,  8,20,21, 8,9,21,  8,11,12, 12,11,15,  16,20,23, 16,19,23]
    indices4 = [2,3,22, 22,3,23,  8,11,12, 12,11,15,  0,1,12, 12,13,1]
	indices5 = [0,3,4, 4,7,3,  0,1,12, 12,13,1,  8,11,12, 12,11,15,  10,22,23, 10,11,23,  16,20,23, 16,19,23]
	indices6 = [0,3,4, 4,7,3,  0,20,21, 0,1,21,  8,11,12, 12,11,15,  10,22,23, 10,11,23,  16,20,23, 16,19,23]
	indices7 = [2,3,22, 22,3,23,  0,3,4, 4,7,3]
	indices8 = [0,3,4, 4,7,3,  0,20,21, 0,1,21,  8,11,12, 12,11,15,  2,3,22, 22,3,23,  16,20,23, 16,19,23]
	indices9 = [0,3,4, 4,7,3,  0,1,12, 12,13,1,  8,11,12, 12,11,15,  2,3,22, 22,3,23,  16,20,23, 16,19,23]

	unit = number % 10;
	tens = (number - unit)/10;
	indices_1 = chose(unit);//chose for switch case
	indices_10 = chose(tens);
	
	//for unit digit object
	vertex_buffer1 = gl.createBuffer();// vertex_buffer1 is created 
	gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer1 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices_sag), gl.STATIC_DRAW );

	index_buffer1 = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, index_buffer1 );// because of using draw elements  array buffer is ELEMENT_ARRAY_BUFFER
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_1), gl.STATIC_DRAW );// at the beggining last of number is 29. So, unit digit is 9

	//for tens object 
	vertex_buffer10 = gl.createBuffer();// vertex_buffer10 is created 
	gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer10 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices_sol), gl.STATIC_DRAW );

	index_buffer10 = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, index_buffer10 );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_10), gl.STATIC_DRAW );// at the beggining last of number is 29. So, tens digits is 2
	
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );// vertices coordinates are 3 dimensional
    gl.enableVertexAttribArray( vPosition );

    transformationMatrixLoc = gl.getUniformLocation( program, "transformationMatrix" );

	document.getElementById("inp_number").oninput = function(event) {
        number = event.srcElement.value;// taking number from number button
    };
    document.getElementById("inp_objX").oninput = function(event) {
        positionx = event.srcElement.value;
    };
    document.getElementById("inp_objY").oninput = function(event) {
        positiony = event.srcElement.value;
    };
    document.getElementById("inp_obj_scaleX").oninput = function(event) {
        scaleX = event.srcElement.value;
    };
    document.getElementById("inp_obj_scaleY").oninput = function(event) {
        scaleY = event.srcElement.value;
    };
    document.getElementById("inp_rotation").oninput = function(event) {
        rotation =event.srcElement.value;
    };
    document.getElementById("redSlider").oninput = function(event) {
        red = event.srcElement.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        green = event.srcElement.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        blue = event.srcElement.value;
    };
	
	colorLoc = gl.getUniformLocation(program,"color");// shader a göndermek için
	mvLoc = gl.getUniformLocation(program,"modelviewMatrix");
    render();

};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	var mystac = [];

	var color = vec4(red,green,blue,1.0);
	gl.uniform4fv(colorLoc, color);
	
	var modelviewMatrix = mat4();
	gl.uniformMatrix4fv(mvLoc, false, flatten(modelviewMatrix));
	
	modelviewMatrix = mult(modelviewMatrix, scalem(scaleX,scaleY,0));
	modelviewMatrix = mult(modelviewMatrix, translate(positionx,positiony,0));
	modelviewMatrix = mult(modelviewMatrix, rotate(rotation,0,0,1));
	mystac.push(modelviewMatrix);
	gl.uniformMatrix4fv(mvLoc,false,flatten(modelviewMatrix));
	
    transformationMatrix = mat4();
    gl.uniformMatrix4fv( transformationMatrixLoc, false, flatten(transformationMatrix) );
	
	unit = number % 10;//finding unit digit of the number
	tens = (number - unit)/10; //finding tents digits of the number
	
    indices_1 = chose(unit); //setting the unit digit with chose(switch case) function acording to mod operation.
	indices_10 = chose(tens);//setting the tents digit with chose(switch case function acording to operation.
	gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer1	);// binding vertex buffer and index buffer for drawing 2 objects
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer1);// binding vertex buffer and index buffer for drawing 2 objects
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_1), gl.STATIC_DRAW );//index buffer should uptaded according to data that come from button
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );// 3D vertex coordinates
	gl.drawElements(gl.TRIANGLES, indices_1.length, gl.UNSIGNED_SHORT, 0);// drawing the object
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer10 );
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer10);
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_10), gl.STATIC_DRAW );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.drawElements(gl.TRIANGLES, indices_10.length, gl.UNSIGNED_SHORT, 0);
	
    window.requestAnimFrame(render);
}

function chose(digit){// function that chose true indices for according to numbers
	switch (digit){
		case 0:
			indices = indices0;
		break;
		
		case 1:
			indices = indices1;
		break;
	
		case 2:
			indices = indices2;
		break;
		
		case 3:
			indices = indices3;
		break;
		
		case 4:
			indices = indices4;
		break;
		
		case 5:
			indices = indices5;
		break;
		
		case 6:
			indices = indices6;
		break;
		
		case 7:
			indices = indices7;
		break;
		
		case 8:
			indices = indices8;
		break;
		
		case 9:
			indices = indices9;
		break;
	}
	return indices;
}