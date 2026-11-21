export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    const prompt =
      typeof body.prompt === "string"
        ? body.prompt.trim()
        : "";

    if (!prompt) {
      return Response.json(
        { error: "Please enter an image prompt." },
        { status: 400 }
      );
    }

    if (prompt.length > 1500) {
      return Response.json(
        { error: "Prompt is too long." },
        { status: 400 }
      );
    }

    const result = await env.AI.run(
      "@cf/black-forest-labs/flux-1-schnell",
      {
        prompt: prompt,
        steps: 4
      }
    );

    return Response.json({
      image: result.image
    });

  } catch (error) {
    return Response.json(
      {
        error: "Image generation failed. Please try again."
      },
      { status: 500 }
    );
  }
}
