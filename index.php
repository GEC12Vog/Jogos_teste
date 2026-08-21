<?php
session_start();

if (!isset($_SESSION['board']) || isset($_GET['reset'])) {
    $_SESSION['board'] = array_fill(0, 9, '');
    $_SESSION['current_player'] = 'X';
    $_SESSION['winner'] = null;
    $_SESSION['is_draw'] = false;
    header("Location: index.php");
    exit;
}

if (isset($_GET['move']) && $_SESSION['winner'] === null && !$_SESSION['is_draw']) {
    $index = (int)$_GET['move'];
    
    if ($index >= 0 && $index <= 8 && $_SESSION['board'][$index] === '') {
        $_SESSION['board'][$index] = $_SESSION['current_player'];

        $winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        $won = false;
        foreach ($winConditions as $cond) {
            if ($_SESSION['board'][$cond[0]] !== '' &&
                $_SESSION['board'][$cond[0]] === $_SESSION['board'][$cond[1]] &&
                $_SESSION['board'][$cond[1]] === $_SESSION['board'][$cond[2]]) {
                $won = true;
                break;
            }
        }

        if ($won) {
            $_SESSION['winner'] = $_SESSION['current_player'];
        } elseif (!in_array('', $_SESSION['board'])) {
            $_SESSION['is_draw'] = true;
        } else {
            $_SESSION['current_player'] = ($_SESSION['current_player'] === 'X') ? 'O' : 'X';
        }
    }
    header("Location: index.php");
    exit;
}

$board = $_SESSION['board'];
$currentPlayer = $_SESSION['current_player'];
$winner = $_SESSION['winner'];
$isDraw = $_SESSION['is_draw'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo da Velha em PHP</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>Jogo da Velha</h1>
  <div id="status">
    <?php
      if ($winner) {
          echo "O jogador ({$winner}) foi o vencedor!";
      } elseif ($isDraw) {
          echo "Empate! Ninguém venceu.";
      } else {
          echo "Vez do jogador: {$currentPlayer}";
      }
    ?>
  </div>

  <div class="board">
    <?php for ($i = 0; $i < 9; $i++): ?>
      <?php if ($board[$i] === '' && !$winner && !$isDraw): ?>
        <a href="index.php?move=<?= $i ?>" class="cell"></a>
      <?php else: ?>
        <div class="cell <?= $board[$i] ? 'disabled' : '' ?>"><?= $board[$i] ?></div>
      <?php endif; ?>
    <?php endfor; ?>
  </div>

  <a href="index.php?reset=1" class="btn">Reiniciar Jogo</a>

</body>
</html>