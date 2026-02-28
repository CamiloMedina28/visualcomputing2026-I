"""
Taller - Transformaciones Homogéneas y Cambios de Base
Implementación completa en Python con NumPy y Matplotlib
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

# ============================================================
# UTILIDADES: Matrices de transformación 2D (3x3)
# ============================================================

def translation_2d(tx, ty):
    """Matriz de traslación 2D."""
    return np.array([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0,  1]
    ], dtype=float)

def rotation_2d(angle_deg):
    """Matriz de rotación 2D (ángulo en grados)."""
    a = np.radians(angle_deg)
    return np.array([
        [np.cos(a), -np.sin(a), 0],
        [np.sin(a),  np.cos(a), 0],
        [0,          0,         1]
    ], dtype=float)

def scale_2d(sx, sy):
    """Matriz de escalamiento 2D."""
    return np.array([
        [sx, 0,  0],
        [0,  sy, 0],
        [0,  0,  1]
    ], dtype=float)

def reflection_2d(axis='x'):
    """Matriz de reflexión 2D respecto a eje x o y."""
    if axis == 'x':
        return np.array([[1, 0, 0], [0, -1, 0], [0, 0, 1]], dtype=float)
    elif axis == 'y':
        return np.array([[-1, 0, 0], [0, 1, 0], [0, 0, 1]], dtype=float)

def apply_transform_2d(T, points):
    """Aplica transformación 2D a array de puntos (Nx2)."""
    # Convertir a homogéneas
    ones = np.ones((points.shape[0], 1))
    ph = np.hstack([points, ones])          # Nx3
    transformed = (T @ ph.T).T             # Nx3
    return transformed[:, :2]              # Nx2

# ============================================================
# UTILIDADES: Matrices de transformación 3D (4x4)
# ============================================================

def translation_3d(tx, ty, tz):
    """Matriz de traslación 3D."""
    return np.array([
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0,  1]
    ], dtype=float)

def rotation_3d_x(angle_deg):
    a = np.radians(angle_deg)
    return np.array([
        [1, 0,       0,      0],
        [0, np.cos(a), -np.sin(a), 0],
        [0, np.sin(a),  np.cos(a), 0],
        [0, 0,       0,      1]
    ], dtype=float)

def rotation_3d_y(angle_deg):
    a = np.radians(angle_deg)
    return np.array([
        [ np.cos(a), 0, np.sin(a), 0],
        [0,          1, 0,         0],
        [-np.sin(a), 0, np.cos(a), 0],
        [0,          0, 0,         1]
    ], dtype=float)

def rotation_3d_z(angle_deg):
    a = np.radians(angle_deg)
    return np.array([
        [np.cos(a), -np.sin(a), 0, 0],
        [np.sin(a),  np.cos(a), 0, 0],
        [0,          0,         1, 0],
        [0,          0,         0, 1]
    ], dtype=float)

def scale_3d(sx, sy, sz):
    return np.array([
        [sx, 0,  0,  0],
        [0,  sy, 0,  0],
        [0,  0,  sz, 0],
        [0,  0,  0,  1]
    ], dtype=float)

def apply_transform_3d(T, points):
    """Aplica transformación 3D a array de puntos (Nx3)."""
    ones = np.ones((points.shape[0], 1))
    ph = np.hstack([points, ones])
    transformed = (T @ ph.T).T
    return transformed[:, :3]

# ============================================================
# ACTIVIDAD 1 - Coordenadas homogéneas 2D
# ============================================================

def actividad1_2d():
    print("\n=== ACTIVIDAD 1: Coordenadas Homogéneas 2D ===")

    # Definir un cuadrado
    square = np.array([
        [0, 0], [1, 0], [1, 1], [0, 1], [0, 0]
    ], dtype=float)

    T_tras  = translation_2d(2, 1)
    T_rot   = rotation_2d(45)
    T_scale = scale_2d(1.5, 0.75)
    T_refl  = reflection_2d('x')

    transforms = {
        'Original':    np.eye(3),
        'Traslación':  T_tras,
        'Rotación 45°':T_rot,
        'Escalamiento':T_scale,
        'Reflexión X': T_refl,
    }

    colors = ['black', 'royalblue', 'firebrick', 'seagreen', 'darkorange']

    fig, axes = plt.subplots(1, 5, figsize=(20, 4))
    fig.suptitle('Actividad 1 – Transformaciones 2D Básicas', fontsize=14, fontweight='bold')

    for ax, (name, T), color in zip(axes, transforms.items(), colors):
        pts = apply_transform_2d(T, square)
        ax.plot(pts[:, 0], pts[:, 1], '-o', color=color, linewidth=2, markersize=5)
        ax.fill(pts[:-1, 0], pts[:-1, 1], alpha=0.25, color=color)
        ax.set_title(name, fontsize=11)
        ax.set_aspect('equal')
        ax.axhline(0, color='gray', linewidth=0.5)
        ax.axvline(0, color='gray', linewidth=0.5)
        ax.grid(True, linestyle='--', alpha=0.4)
        ax.set_xlim(-3, 5);  ax.set_ylim(-3, 4)

    plt.tight_layout()
    plt.savefig('../media/actividad1_transformaciones_2d.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("  ✓ Guardado: media/actividad1_transformaciones_2d.png")

# ============================================================
# ACTIVIDAD 2 - Composición de transformaciones
# ============================================================

def actividad2_composicion():
    print("\n=== ACTIVIDAD 2: Composición de Transformaciones ===")

    triangle = np.array([[0, 0], [1, 0], [0.5, 1], [0, 0]], dtype=float)

    T = translation_2d(2, 0)
    R = rotation_2d(90)

    # Orden 1: Primero traslado, luego roto  -> R @ T
    RT = R @ T
    # Orden 2: Primero roto, luego traslado  -> T @ R
    TR = T @ R

    fig, axes = plt.subplots(1, 3, figsize=(14, 5))
    fig.suptitle('Actividad 2 – El Orden de las Transformaciones Importa', fontsize=13, fontweight='bold')

    for ax in axes:
        ax.axhline(0, color='gray', linewidth=0.5)
        ax.axvline(0, color='gray', linewidth=0.5)
        ax.set_aspect('equal'); ax.grid(True, linestyle='--', alpha=0.4)
        ax.set_xlim(-4, 4); ax.set_ylim(-4, 4)

    # Original
    for ax in axes:
        p = apply_transform_2d(np.eye(3), triangle)
        ax.fill(p[:-1,0], p[:-1,1], alpha=0.2, color='gray')
        ax.plot(p[:,0], p[:,1], '--', color='gray', linewidth=1, label='Original')

    # R @ T
    p_RT = apply_transform_2d(RT, triangle)
    axes[0].fill(p_RT[:-1,0], p_RT[:-1,1], alpha=0.4, color='royalblue')
    axes[0].plot(p_RT[:,0], p_RT[:,1], '-o', color='royalblue', linewidth=2)
    axes[0].set_title('R @ T\n(Rotar DESPUÉS de trasladar)', fontsize=10)

    # T @ R
    p_TR = apply_transform_2d(TR, triangle)
    axes[1].fill(p_TR[:-1,0], p_TR[:-1,1], alpha=0.4, color='firebrick')
    axes[1].plot(p_TR[:,0], p_TR[:,1], '-o', color='firebrick', linewidth=2)
    axes[1].set_title('T @ R\n(Trasladar DESPUÉS de rotar)', fontsize=10)

    # Comparación en un solo gráfico
    axes[2].fill(p_RT[:-1,0], p_RT[:-1,1], alpha=0.3, color='royalblue', label='R @ T')
    axes[2].plot(p_RT[:,0], p_RT[:,1], '-', color='royalblue', linewidth=2)
    axes[2].fill(p_TR[:-1,0], p_TR[:-1,1], alpha=0.3, color='firebrick', label='T @ R')
    axes[2].plot(p_TR[:,0], p_TR[:,1], '-', color='firebrick', linewidth=2)
    axes[2].legend(fontsize=10)
    axes[2].set_title('Comparación: R@T ≠ T@R', fontsize=10)

    plt.tight_layout()
    plt.savefig('../media/actividad2_composicion.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("  ✓ Guardado: media/actividad2_composicion.png")
    print(f"  RT:\n{np.round(RT, 3)}\n  TR:\n{np.round(TR, 3)}")

# ============================================================
# ACTIVIDAD 3 - Coordenadas homogéneas 3D (cubo)
# ============================================================

def make_cube():
    """Vértices de un cubo unitario."""
    v = np.array([
        [0,0,0],[1,0,0],[1,1,0],[0,1,0],
        [0,0,1],[1,0,1],[1,1,1],[0,1,1]
    ], dtype=float)
    faces = [
        [v[0],v[1],v[2],v[3]],
        [v[4],v[5],v[6],v[7]],
        [v[0],v[1],v[5],v[4]],
        [v[2],v[3],v[7],v[6]],
        [v[0],v[3],v[7],v[4]],
        [v[1],v[2],v[6],v[5]],
    ]
    return v, faces

def actividad3_3d():
    print("\n=== ACTIVIDAD 3: Coordenadas Homogéneas 3D ===")

    verts, _ = make_cube()

    T = translation_3d(2, 1, 0.5)
    R = rotation_3d_z(45) @ rotation_3d_x(30)
    S = scale_3d(1.5, 1.5, 1.5)

    transforms_3d = {
        'Original':   np.eye(4),
        'Traslación': T,
        'Rotación Z45+X30': R,
        'Escalamiento': S,
    }

    fig = plt.figure(figsize=(18, 5))
    fig.suptitle('Actividad 3 – Transformaciones 3D (Cubo)', fontsize=13, fontweight='bold')

    colors_3d = ['steelblue', 'coral', 'mediumseagreen', 'orchid']
    face_indices = [
        [0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]
    ]

    for i, (name, Tm) in enumerate(transforms_3d.items()):
        ax = fig.add_subplot(1, 4, i+1, projection='3d')
        tv = apply_transform_3d(Tm, verts)
        faces_verts = [[tv[j] for j in fi] for fi in face_indices]
        poly = Poly3DCollection(faces_verts, alpha=0.3,
                                facecolor=colors_3d[i], edgecolor='black', linewidth=0.8)
        ax.add_collection3d(poly)
        ax.set_xlim(-1, 4); ax.set_ylim(-1, 4); ax.set_zlim(-1, 3)
        ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
        ax.set_title(name, fontsize=10)

    plt.tight_layout()
    plt.savefig('../media/actividad3_3d_cubo.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("  ✓ Guardado: media/actividad3_3d_cubo.png")

# ============================================================
# ACTIVIDAD 4 - Cambios de base
# ============================================================

def draw_frame_2d(ax, T, label, color, scale=0.5):
    """Dibuja un sistema de referencia 2D."""
    origin = apply_transform_2d(T, np.array([[0, 0]]))[0]
    x_axis = apply_transform_2d(T, np.array([[scale, 0]]))[0]
    y_axis = apply_transform_2d(T, np.array([[0, scale]]))[0]
    ax.annotate('', xy=x_axis, xytext=origin,
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    ax.annotate('', xy=y_axis, xytext=origin,
                arrowprops=dict(arrowstyle='->', color='blue', lw=2))
    ax.text(origin[0]-0.2, origin[1]-0.2, label, fontsize=10,
            color=color, fontweight='bold')

def actividad4_cambio_base():
    print("\n=== ACTIVIDAD 4: Cambios de Base ===")

    # Frame mundo W (identidad)
    T_W = np.eye(3)
    # Frame A: trasladado y rotado respecto a W
    T_WA = translation_2d(2, 1) @ rotation_2d(30)
    # Frame B: trasladado respecto a A
    T_AB = translation_2d(1.5, 0.5) @ rotation_2d(-20)
    # Frame B visto desde W
    T_WB = T_WA @ T_AB

    # Un punto en frame B
    p_B = np.array([[1.0, 0.5]])
    p_A = apply_transform_2d(T_AB, p_B)
    p_W = apply_transform_2d(T_WB, p_B)

    fig, ax = plt.subplots(1, 1, figsize=(8, 7))
    ax.set_title('Actividad 4 – Cambios de Base entre Marcos de Referencia', fontsize=12, fontweight='bold')
    ax.set_xlim(-1, 6); ax.set_ylim(-1, 5)
    ax.set_aspect('equal'); ax.grid(True, linestyle='--', alpha=0.4)
    ax.axhline(0, color='gray', linewidth=0.5)
    ax.axvline(0, color='gray', linewidth=0.5)

    draw_frame_2d(ax, T_W,  'W (Mundo)', 'black')
    draw_frame_2d(ax, T_WA, 'A', 'green')
    draw_frame_2d(ax, T_WB, 'B', 'purple')

    # Punto en los tres sistemas
    ax.scatter(*p_W[0], s=80, color='gold', zorder=5, edgecolors='black')
    ax.annotate(f'P (en W): {np.round(p_W[0], 2)}', p_W[0] + 0.1, fontsize=9)

    # Leyenda manual
    patches = [
        mpatches.Patch(color='black',  label='Frame W (Mundo)'),
        mpatches.Patch(color='green',  label='Frame A (T_WA)'),
        mpatches.Patch(color='purple', label='Frame B (T_WB = T_WA @ T_AB)'),
        mpatches.Patch(color='gold',   label=f'Punto P: B={np.round(p_B[0],2)}, W={np.round(p_W[0],2)}'),
    ]
    ax.legend(handles=patches, loc='upper left', fontsize=9)

    plt.tight_layout()
    plt.savefig('../media/actividad4_cambio_base.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"  Punto en B:     {p_B[0]}")
    print(f"  Punto en A:     {np.round(p_A[0], 4)}")
    print(f"  Punto en Mundo: {np.round(p_W[0], 4)}")
    print("  ✓ Guardado: media/actividad4_cambio_base.png")

# ============================================================
# ACTIVIDAD 5 - Transformaciones inversas
# ============================================================

def actividad5_inversa():
    print("\n=== ACTIVIDAD 5: Transformaciones Inversas ===")

    square = np.array([[0,0],[2,0],[2,2],[0,2],[0,0]], dtype=float)

    T = translation_3d(3, 1, 0)[:3,:3]   # sólo usamos 2D aquí
    # Construcción compuesta en 2D
    T_comp = translation_2d(2, 1) @ rotation_2d(60) @ scale_2d(1.5, 1.5)
    T_inv  = np.linalg.inv(T_comp)

    identity_check = np.round(T_comp @ T_inv, 6)
    print(f"  T @ T⁻¹ ≈ I? {np.allclose(identity_check, np.eye(3))}")

    pts_orig  = apply_transform_2d(np.eye(3), square)
    pts_trans = apply_transform_2d(T_comp,    square)
    pts_back  = apply_transform_2d(T_inv,     pts_trans)

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    fig.suptitle('Actividad 5 – Transformaciones Inversas (T @ T⁻¹ = I)', fontsize=13, fontweight='bold')

    configs = [
        (axes[0], pts_orig,  'Original',             'black'),
        (axes[1], pts_trans, 'Transformado (T)',      'royalblue'),
        (axes[2], pts_back,  'Vuelto al origen (T⁻¹)','firebrick'),
    ]

    for ax, pts, title, color in configs:
        ax.fill(pts[:-1,0], pts[:-1,1], alpha=0.3, color=color)
        ax.plot(pts[:,0], pts[:,1], '-o', color=color, linewidth=2)
        ax.set_title(title, fontsize=11)
        ax.set_aspect('equal'); ax.grid(True, linestyle='--', alpha=0.4)
        ax.axhline(0, color='gray', lw=0.5); ax.axvline(0, color='gray', lw=0.5)
        ax.set_xlim(-4, 7); ax.set_ylim(-3, 6)

    # Superponer original sobre el retransformado para verificar
    axes[2].fill(pts_orig[:-1,0], pts_orig[:-1,1], alpha=0.15, color='black', linestyle='--')
    axes[2].plot(pts_orig[:,0], pts_orig[:,1], '--', color='gray', linewidth=1, label='Original ref')
    axes[2].legend(fontsize=9)

    plt.tight_layout()
    plt.savefig('../media/actividad5_inversa.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("  ✓ Guardado: media/actividad5_inversa.png")

# ============================================================
# ACTIVIDAD 6 - Brazo robótico (cinemática directa)
# ============================================================

def draw_robot_arm(ax, joint_angles_deg, link_lengths, title):
    """Dibuja brazo robótico planar con n articulaciones."""
    n = len(joint_angles_deg)
    T = np.eye(3)
    positions = [apply_transform_2d(T, np.array([[0, 0]]))[0]]
    colors = plt.cm.plasma(np.linspace(0.1, 0.9, n))

    for i, (theta, l) in enumerate(zip(joint_angles_deg, link_lengths)):
        T = T @ rotation_2d(theta) @ translation_2d(l, 0)
        pos = apply_transform_2d(T, np.array([[0, 0]]))[0]
        positions.append(pos)

    positions = np.array(positions)

    for i in range(len(positions) - 1):
        ax.plot([positions[i,0], positions[i+1,0]],
                [positions[i,1], positions[i+1,1]],
                '-', color=colors[i], linewidth=5, solid_capstyle='round')
        ax.scatter(*positions[i], s=100, color=colors[i], zorder=5, edgecolors='black')

    ax.scatter(*positions[-1], s=150, marker='*', color='gold', zorder=6, edgecolors='black')
    ax.text(positions[-1,0]+0.1, positions[-1,1]+0.1,
            f'EF\n({positions[-1,0]:.2f}, {positions[-1,1]:.2f})',
            fontsize=8, color='black')

    ax.set_title(title, fontsize=10)
    ax.set_aspect('equal'); ax.grid(True, linestyle='--', alpha=0.4)
    ax.axhline(0, color='gray', lw=0.5); ax.axvline(0, color='gray', lw=0.5)
    ax.set_xlim(-5, 6); ax.set_ylim(-4, 6)

    return positions[-1]

def actividad6_robotica():
    print("\n=== ACTIVIDAD 6: Aplicación en Robótica (Forward Kinematics) ===")

    links = [2.0, 1.5, 1.0, 0.7]

    configs = [
        ([0,   0,   0,   0],  'Config 1: Brazo extendido'),
        ([30, -20,  45, -15], 'Config 2: Pose natural'),
        ([90,  30, -60,  30], 'Config 3: Pose doblada'),
        ([45,  60,  30,  20], 'Config 4: Pose alta'),
    ]

    fig, axes = plt.subplots(2, 2, figsize=(14, 12))
    fig.suptitle('Actividad 6 – Cinemática Directa: Brazo Robótico 4-DOF\n(Transformaciones homogéneas encadenadas)',
                 fontsize=13, fontweight='bold')

    for ax, (angles, title) in zip(axes.flatten(), configs):
        ef = draw_robot_arm(ax, angles, links, title)
        angle_str = ', '.join(f'{a}°' for a in angles)
        ax.text(-4.5, -3.5, f'Ángulos: [{angle_str}]', fontsize=8,
                bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.8))

    plt.tight_layout()
    plt.savefig('../media/actividad6_robotica.png', dpi=150, bbox_inches='tight')
    plt.close()
    print("  ✓ Guardado: media/actividad6_robotica.png")

    # Demostración explícita de matrices encadenadas
    print("\n  --- Forward Kinematics Paso a Paso (Config 2) ---")
    T = np.eye(3)
    angles = [30, -20, 45, -15]
    lengths = [2.0, 1.5, 1.0, 0.7]
    for i, (a, l) in enumerate(zip(angles, lengths)):
        T = T @ rotation_2d(a) @ translation_2d(l, 0)
        pos = apply_transform_2d(T, np.array([[0,0]]))[0]
        print(f"  Junta {i+1}: θ={a}°, l={l} → Posición: ({pos[0]:.4f}, {pos[1]:.4f})")

# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    media_dir = os.path.join(script_dir, '..', 'media')
    os.makedirs(media_dir, exist_ok=True)
    os.chdir(script_dir)

    print("=" * 55)
    print("  TALLER: Transformaciones Homogéneas y Cambios de Base")
    print("=" * 55)

    actividad1_2d()
    actividad2_composicion()
    actividad3_3d()
    actividad4_cambio_base()
    actividad5_inversa()
    actividad6_robotica()

    print("\n✅ Todas las actividades completadas. Imágenes en media/")
