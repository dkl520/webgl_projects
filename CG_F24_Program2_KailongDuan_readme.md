# Project Overview

## 1. Code Components  
This section involves key code functionalities:  
- **Buffer Handling**: Manage buffers for vertex data, index data, and other resources.  
- **Brush Handling**: Configure drawing modes (e.g., fill, wireframe) and tools.  
- **MatrixLoader Handling**: Load and update transformation matrices (model, view, projection camera).  
- **Controller Addition**: Add logic for camera and model interactions.  
- **Stack Implementation**: Implement matrix stacks for managing transformation states efficiently.
---

## 2. Operations  
This section covers transformations, lighting, and interaction:  
- **Color Modification**: Adjust the colors of objects dynamically.  
- **Light Intensity Control**: Modify light source intensity and direction.  
- **Light Direction Adjustment**: Control the Light's x, y, z coordinates.  
- **Rotation, Translation, and Scaling**: Enable transformations on objects.  
- **Projection Conversion**: Support switching between **perspective projection** and **orthographic projection**.

---

## 3. Camera Control  
Adjust the camera’s position, target, and orientation using the following parameters:  
- **Eye Position (eye)**: `eyex`, `eyey`, `eyez` – control the camera’s location.  
- **Target Position (at)**: `atx`, `aty`, `atz` – define where the camera looks.  
- **Up Direction (up)**: `upx`, `upy`, `upz` – establish the camera’s upward direction.

---

## 4. Model Loading and Display  
- **External OBJ Files**: Load models from external `.obj` files to render complex 3D shapes and objects.

---

## 5. Excavator Model Interaction  
Control the excavator model using keyboard inputs:  
- **Directional Control**:  
  - `up` / `down` / `left` / `right` – move the excavator in the corresponding direction.  
- **Function Keys**:  
  - **Direction for joints**: `y` / `h`.  
  - **Additional Operations**: `z`, `x`, `v`, `c`, `k`, `j`.

---

## 6. # Exceptional Work
  - **Provide a Way to Move the Light**: 
  - **Change Material Properties for Different Effects**: 
  - **Include complex figures generate from external modeling tools ( from *.obj files)**: 

---

## FinalVersion
1. This is the fifth version I've changed, and I think it's pretty much the final version

2. To meet the requirements, I kept adding more features. However, the code gradually became more complex, forcing me to rebuild it using OOP principles.

3. Since the project involved various functionalities, I had to construct multiple complex matrices and integrate them with related variables.

4. I implemented both **perspective projection** and **orthographic projection**.  
   - **Perspective projection** simulates looking at an object from an angled view.  
   - **Orthographic projection** provides a front-facing, uniform size view of the object.

5. For loading **.obj files**, I had to parse the vertices and normals to render the object and calculate lighting effects. This may also involve texture coordinates (not entirely sure, but likely necessary).

6. Since the project required rendering multiple objects, I needed to distinguish between different ones. I added new logical arrays, similar to **index arrays**, to separate and manage the transformations for each object.

7. After some research on **skyboxes** and **projection matrices**, I found that I’ll need to use **environment mapping** and **shadow mapping** techniques to achieve the desired effect. This looks quite complex and will likely require extra time and effort to study thoroughly.




