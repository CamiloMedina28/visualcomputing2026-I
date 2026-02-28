using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class CameraController : MonoBehaviour
{
    [Header("UI References")]
    public Button switchButton;
    public TextMeshProUGUI infoText;
    public Slider orthoSizeSlider;

    private Camera cam;
    private bool isPerspective = true;

    void Start()
    {
        cam = GetComponent<Camera>();
        cam.orthographic = false;
        cam.fieldOfView = 50;

        switchButton.onClick.AddListener(ToggleProjection);

        orthoSizeSlider.minValue = 2;
        orthoSizeSlider.maxValue = 20;
        orthoSizeSlider.value = 8;
        orthoSizeSlider.gameObject.SetActive(false);
        orthoSizeSlider.onValueChanged.AddListener(OnOrthoSizeChanged);
    }

    void Update()
    {
        UpdateInfoText();
    }

    void ToggleProjection()
    {
        isPerspective = !isPerspective;
        cam.orthographic = !isPerspective;

        if (!isPerspective)
            cam.orthographicSize = orthoSizeSlider.value;

        orthoSizeSlider.gameObject.SetActive(!isPerspective);
        switchButton.GetComponentInChildren<TextMeshProUGUI>().text =
            isPerspective ? "Switch to Orthographic" : "Switch to Perspective";
    }

    void OnOrthoSizeChanged(float value)
    {
        cam.orthographicSize = value;
    }

    void UpdateInfoText()
    {
        if (isPerspective)
        {
            infoText.text = $"Type: Perspective\n" +
                            $"FOV: {cam.fieldOfView}°\n" +
                            $"Aspect: {cam.aspect:F2}\n" +
                            $"Near: {cam.nearClipPlane}\n" +
                            $"Far: {cam.farClipPlane}";
        }
        else
        {
            float size = cam.orthographicSize;
            float aspect = cam.aspect;
            infoText.text = $"Type: Orthographic\n" +
                            $"Left: {(-size * aspect):F1}\n" +
                            $"Right: {(size * aspect):F1}\n" +
                            $"Top: {size:F1}\n" +
                            $"Bottom: {-size:F1}";
        }
    }
}