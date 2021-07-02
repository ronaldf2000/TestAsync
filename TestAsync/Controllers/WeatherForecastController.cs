using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestAsync.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private const int MinValue = 100;
        private const int MaxValue = 10000;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly Random _random;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _random = new Random();
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 15).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("{temp}/calculate")]
        public async Task<long> GetCalculation(int temp)
        {
            long value = _random.Next(MinValue, MaxValue);
            await Task.Delay((int)value);
            //Ja hier is divide by zero gewoon om te laten zien
            return value * (temp/Math.Abs(temp))+ temp * MaxValue * 10;
        }
    }
}
