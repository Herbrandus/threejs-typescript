import { BoxGeometry, Color, DirectionalLight, Group, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Main {
    private windowWidth: number;
    private windowHeight: number;
    
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private objectsGroup: Group;

    private navControls: OrbitControls;
    
    private viewAngle = 45;
    private aspectRatio: number;
    private cameraNear = 0.1;
    private cameraFar = 10000;

    constructor(container: string) {
        
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.renderer = new WebGLRenderer({ 
            antialias: true
        });
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.setSize(this.windowWidth, this.windowHeight);

        this.scene = new Scene();
        this.scene.background = new Color('rgb(18, 147, 249)');

        this.aspectRatio = this.windowWidth / this.windowHeight;
        this.camera = new PerspectiveCamera(this.viewAngle, this.aspectRatio, this.cameraNear, this.cameraFar);
        this.camera.position.set(3, 4, 5);

        const light = new DirectionalLight( 0xffffff, 0.5);
        this.scene.add(light);

        this.objectsGroup = new Group();        
        this.scene.add(this.objectsGroup);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        const cubeMaterial = new MeshStandardMaterial({ color: 0x35bbef });
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(cube);

        const html = document.querySelector(container);
        html?.appendChild(this.renderer.domElement);

        this.navControls = new OrbitControls(this.camera, this.renderer.domElement);

        const update = () => {
            this.updateScene(this.navControls);            
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        
        this.setEventListeners();
    }

    setEventListeners() {

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
    }

    private updateScene(controls: OrbitControls): void {
        controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('load',() => {
    new Main('#container');
});