using Microsoft.AspNetCore.Mvc;

namespace GuessNumberGame.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase {
    private static int _secretNumber = new Random().Next(1, 101);
    private static int _attempts = 0;

    [HttpPost("attempt")]
    public IActionResult CheckGuess([FromBody] GuessRequest req) {
        _attempts++;
        
        if (req.Guess == _secretNumber) {
            return Ok(new { message = $"Parabéns! Você acertou em {_attempts} tentativas!", status = "success", attempts = _attempts });
        }
        
        string tip = req.Guess > _secretNumber ? "Menor" : "Maior";
        return Ok(new { message = tip, status = "error", attempts = _attempts });
    }

    [HttpPost("restart")]
    public IActionResult RestartGame() {
        _secretNumber= new Random().Next(1, 101);
        _attempts = 0;
        return Ok();
    }
}

public record GuessRequest(int Guess);
