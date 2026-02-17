using UnityEngine;

[RequireComponent(typeof(MeshFilter))]
public class MeshInfo : MonoBehaviour
{
    void Start()
    {
        Mesh mesh = GetComponent<MeshFilter>().sharedMesh;

        if (mesh == null)
        {
            Debug.LogError("No se encontró Mesh.");
            return;
        }

        Debug.Log("=== INFORMACIÓN DE LA MALLA ===");
        Debug.Log("Vértices: " + mesh.vertexCount);
        Debug.Log("Triángulos: " + mesh.triangles.Length / 3);
        Debug.Log("Sub-mallas: " + mesh.subMeshCount);
    }
}
