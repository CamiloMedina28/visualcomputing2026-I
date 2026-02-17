using UnityEngine;

public class AutoRotate : MonoBehaviour
{
    public Vector3 eje = Vector3.up;
    public float speed = 50f;

    void Update()
{
    transform.Rotate(0f, 50f * Time.deltaTime, 0f);
}
    
}
